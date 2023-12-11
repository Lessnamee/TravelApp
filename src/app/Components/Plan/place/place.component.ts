import { Component } from '@angular/core';
import { PackingListService } from 'src/app/shared/services/packing-list.service';
import { WeatherService } from 'src/app/shared/services/weather.service';


@Component({
  selector: 'place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent {

  city: string = '';

  constructor(private packingListService: PackingListService) {}

  updateCity(){
    this.packingListService.setCity(this.city);
  }
  
}

