import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PackingListService } from 'src/app/shared/services/packing-list.service';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  selectedThings: string[] = [];
  visibleThings: string[] = [];
  newThing: string = ''; 
  newVisit: string = ''; 
  weatherData: any;
  city = this.packingListService.getCity();

  
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  private firestore: AngularFirestore,
  private packingListService: PackingListService,
  private weatherService: WeatherService
    ) {
    console.log(data)
    this.visibleThings = [...data.travel.selectedThings];

  }

  ngOnInit(): void {
    this.getWeather()
  }

  removeThing(thing: string) {
    const travelID = this.packingListService.getTravelId();

    const updatedThings = this.data.travel.selectedThings.filter(item => item !== thing);

    this.firestore.collection('travel', ref => ref.where('travelId', '==', travelID))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({ selectedThings: updatedThings }).then(() => {
            console.log('Zaktualizowano dokument w Firebase po usunięciu rzeczy.');
            this.visibleThings = updatedThings;
          }).catch(error => {
            console.error('Błąd podczas aktualizowania dokumentu: ', error);
          });
        });
      });
  } 

  addThing() {
    if (this.newThing.trim() !== '') {
      const travelID = this.packingListService.getTravelId();

      const updatedThings = [...this.data.travel.selectedThings, this.newThing.trim()];

      this.firestore.collection('travel', ref => ref.where('travelId', '==', travelID))
        .get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({ selectedThings: updatedThings }).then(() => {
              console.log('Zaktualizowano dokument w Firebase po dodaniu rzeczy.');
              this.visibleThings = updatedThings;
              this.newThing = ''; 
            }).catch(error => {
              console.error('Błąd podczas aktualizowania dokumentu: ', error);
            });
          });
        });
    }
  }

  addVisit(){


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

}
