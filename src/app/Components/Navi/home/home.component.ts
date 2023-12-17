import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MapService } from 'src/app/shared/services/map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  @ViewChild('mapContainer', { static: true }) mapContainer: ElementRef;

  constructor(private mapService: MapService
    ) {}


    ngOnInit() {
      if (this.mapContainer && this.mapContainer.nativeElement) {
        // this.mapService.initializeMap(this.mapContainer.nativeElement);
      }
    }
    
  
}
