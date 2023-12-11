import { Component } from '@angular/core';
import { PackingListService } from 'src/app/shared/services/packing-list.service';

@Component({
  selector: 'new-travel',
  templateUrl: './new-travel.component.html',
  styleUrls: ['./new-travel.component.css']
})
export class NewTravelComponent {
  name: string = '';

  constructor(
    private packingListService: PackingListService
  ) {}

  updateName(){
    this.packingListService.setName(this.name);

  }

}
