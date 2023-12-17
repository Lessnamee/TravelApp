// map.component.ts
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MapService } from 'src/app/shared/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private mapService: MapService, private afs: AngularFirestore) {}

  ngOnInit() {
    this.mapService.initializeMap('map');
  }
  
}
