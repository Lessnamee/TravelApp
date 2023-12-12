import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { PackingListService } from 'src/app/shared/services/packing-list.service';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  city = this.packingListService.getCity();
  name = this.packingListService.getName();
  weatherData: any;
  selectedThings: string[] = [];
  newThing: string = '';

  constructor(
    private packingListService: PackingListService,
    private weatherService: WeatherService,
    private activityService: ActivityService,
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getWeather()
    this.activityService.selectedThings$.subscribe((selectedThings) => {
      this.selectedThings = selectedThings;
    });
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe((data) => {
      this.weatherData = data;
      this.weatherData.main.temp = this.kelvinToCelsius(this.weatherData.main.temp).toFixed(2);
    });
  }

  private kelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
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


