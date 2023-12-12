import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { PackingListService } from 'src/app/shared/services/packing-list.service';
import { WeatherService } from 'src/app/shared/services/weather.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit{

  city = this.packingListService.getCity();
  name = this.packingListService.getName();
  weatherData: any;
  selectedThings: string[] = [];
  newThing: string = '';

  constructor(
    private packingListService: PackingListService,
    private weatherService: WeatherService,
    private activityService: ActivityService,
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

  addWallet() {
    this.router.navigate(['/finances']); 
  }

  addMemories() {
    this.router.navigate(['/memory-see']);
  }

  addThing() {
    if (this.newThing.trim() !== '') {
      this.selectedThings.push(this.newThing);
      this.newThing = ''; 
    }
  }

  removeThing(index: number) {
    this.selectedThings.splice(index, 1);
  }


}
