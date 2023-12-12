import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ActivityService } from 'src/app/shared/services/activity.service';
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

  city = this.packingListService.getCity();
  name = this.packingListService.getName();

  private selectedThings: string[] = [];

  travelDetails = {
    isChecked: false,
  };


  constructor(
    private packingListService: PackingListService,
    private activityService: ActivityService,
    private weatherService: WeatherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updatePackingList();
    this.getWeather();
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
    console.log(this.selectedThings);
    this.activityService.updateSelectedThings(this.selectedThings);
    this.router.navigate(['/summary']);
  }
}
