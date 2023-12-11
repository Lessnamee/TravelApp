import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { PackingListService } from 'src/app/shared/services/packing-list.service';
import { WeatherService } from 'src/app/shared/services/weather.service';


@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.css'],
})
export class TravelDetailsComponent implements OnInit {
  activityPackingList: { activity: string, items: Observable<string[]> }[] = [];
  standardPackingList: Observable<string[]>;
  weatherData: any;

  city = this.packingListService.getCity();
  name = this.packingListService.getName();


  constructor(
    private packingListService: PackingListService,
    private activityService: ActivityService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.updatePackingList();

    this.activityService.selectedActivities$.subscribe(() => {
      this.updatePackingList();
    });
    
    this.getWeather()
  }


  // updatePackingList() {
  //   this.activityPackingList = [];

  //   this.standardPackingList = this.packingListService.getPackingList('standard');
    
  //   const selectedActivities = this.activityService.selectedActivitiesValue;
  //   selectedActivities.forEach((activity) => {
  //     if (activity !== 'standard') {
  //       const packingListForActivity = this.packingListService.getPackingList(activity);
  //       this.activityPackingList.push({ activity, items: packingListForActivity });
  //     }
  //   });
  // }


  updatePackingList() {
    this.activityPackingList = [];
  
    this.standardPackingList = this.packingListService.getPackingList('standard');
  
    const selectedActivities = this.activityService.selectedActivitiesValue;
    selectedActivities.forEach((activity) => {
      if (activity !== 'standard') {
        const packingListForActivity = this.packingListService.getPackingList(activity);
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

  private kelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }

}

