import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PackingListService } from 'src/app/shared/services/packing-list.service';
import { WeatherService } from 'src/app/shared/services/weather.service';

export class PackingListItem {
  name: string;
  isChecked: boolean;

  constructor(name: string) {
    this.name = name;
    this.isChecked = false;
  }
}

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.css'],
})
export class TravelDetailsComponent implements OnInit {
  activityPackingList: { activity: string; items: Observable<PackingListItem[]> }[] = [];

  standardPackingList: Observable<PackingListItem[]>;

  weatherData: any;
  newThing: string = '';
  selectedThings: string[] = [];

  city = this.packingListService.getCity();
  name = this.packingListService.getName();


  travelDetails = {
    isChecked: false,
  };


  constructor(
    private packingListService: PackingListService,
    private activityService: ActivityService,
    private weatherService: WeatherService,
    private router: Router,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updatePackingList();
    this.getWeather();

    this.activityService.selectedThings$.subscribe((selectedThings) => {
      this.selectedThings = selectedThings;
    });
  }

  updatePackingList() {
    this.standardPackingList = this.packingListService.getPackingList('standard').pipe(
      map(items => items.map(name => new PackingListItem(name)))
    );
  
    const selectedActivities = this.activityService.selectedActivitiesValue;
    this.activityPackingList = [];
  
    selectedActivities.forEach((activity) => {
      if (activity !== 'standard') {
        const packingListForActivity = this.packingListService.getPackingList(activity).pipe(
          map(items => items.map(name => new PackingListItem(name)))
        );
        this.activityPackingList.push({ activity, items: packingListForActivity });
      }
    });
  }
  

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe((data) => {
      this.weatherData = data;
      this.weatherData.main.temp = this.kelvinToCelsius(this.weatherData.main.temp).toFixed(2);
    });
  }

  onCheckboxChange(item: PackingListItem): void {
  
    if (item.isChecked) {
      this.addSelectedThing(item.name);
      console.log(item.isChecked);
    } else {
      this.removeSelectedThing(item.name);
    }
  }

  addSelectedThing(thing: string): void {
    this.selectedThings.push(thing);
  }

  removeSelectedThing(thing: string): void {
    const index = this.selectedThings.indexOf(thing);
    if (index !== -1) {
      this.selectedThings.splice(index, 1);
    }
  }

  private kelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }

  onNextClick() {
    this.activityService.updateSelectedThings(this.selectedThings);

    const travelCollection = this.firestore.collection('travel');

      if (this.selectedThings.length > 0) {
        const travelData = {
          travelId: this.firestore.createId(),
          userId: this.authService.getLoggedInUser().uid,
          userEmail: this.authService.getLoggedInUser().email,
          selectedThings: this.selectedThings,
          name: this.name,
          city: this.city
        };

        travelCollection.add(travelData).then(docRef => {
          console.log('Dodano nowy dokument z ID: ', docRef.id);
          this.packingListService.setTravelId(travelData.travelId)
        }).catch(error => {
          console.error('Błąd podczas dodawania dokumentu: ', error);
        });
      } else {
        console.warn('Dodaj przynajmniej jedną rzecz przed zapisaniem do Firebase.');
      }

      this.router.navigate(['/see-travel']);
  }

  
  addThing() {
    if (this.newThing.trim() !== '') {
      this.selectedThings.push(this.newThing);
  
      const travelID = this.packingListService.getTravelId();
  
      const selectedThings = this.selectedThings.slice();
  
      this.firestore.collection('travel', ref => ref.where('travelId', '==', travelID))
        .get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({ selectedThings }).then(() => {
              console.log('Zaktualizowano dokument w Firebase po dodaniu rzeczy.');
            }).catch(error => {
              console.error('Błąd podczas aktualizowania dokumentu: ', error);
            });
          });
        });
  
      this.newThing = '';
    }
  }
  


  removeThing(index: number) {
    this.selectedThings.splice(index, 1);

    const travelID = this.packingListService.getTravelId();

    const selectedThings = this.selectedThings.slice(); 

    this.firestore.collection('travel', ref => ref.where('travelId', '==', travelID))
    .get()
    .subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {

        doc.ref.update({ selectedThings }).then(() => {
          console.log('Zaktualizowano dokument w Firebase po usunięciu rzeczy.');
        }).catch(error => {
          console.error('Błąd podczas aktualizowania dokumentu: ', error);
        });

      });
    });
  }
}
