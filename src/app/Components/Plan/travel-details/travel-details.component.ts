import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  @Output() selectedItems = new EventEmitter<any>();


  constructor(
    private packingListService: PackingListService,
    private activityService: ActivityService,
    private weatherService: WeatherService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updatePackingList();

    this.getWeather()
  }


  updatePackingList() {

    this.standardPackingList = this.packingListService.getPackingList('standard');

    const selectedActivities = this.activityService.selectedActivitiesValue;
    this.activityPackingList = [];

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

