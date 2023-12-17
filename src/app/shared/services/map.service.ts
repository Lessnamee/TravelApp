// map.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private mapboxToken = 'pk.eyJ1Ijoia2luZ3VzaWEzMTkiLCJhIjoiY2xxOWhvOGd1MWk2ZjJpcHNuZ21wcXdzeCJ9.D1o93u2Gsgado1K4QI5cLA';
  private map: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];

  constructor(private afs: AngularFirestore) {
    mapboxgl.accessToken = this.mapboxToken;
  }

  initializeMap(container: string) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2luZ3VzaWEzMTkiLCJhIjoiY2xxOWhvOGd1MWk2ZjJpcHNuZ21wcXdzeCJ9.D1o93u2Gsgado1K4QI5cLA';
    // const coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [0, 0],
    zoom: 2
    });
    
    const marker = new mapboxgl.Marker({
    draggable: true
    })
    .setLngLat([0, 0])
    .addTo(map);
    // this.map = new mapboxgl.Map({
    //   container,
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [0, 0],
    //   zoom: 2,
    // });
  
    // this.loadMemories();
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

  loadMemories() {
    this.clearMarkers(); 
  
    this.afs.collection('memories').valueChanges().subscribe((memories: any[]) => {
      memories = [memories[0]]
      // const bounds = this.calculateBoundsForMemories(memories);
  
      // console.log('Bounds:', bounds);
      
      // const offset = [0, 0];
      // this.map.fitBounds(bounds, { padding: 20, offset });
  
      this.markers = memories.map(memory => this.createMemoryMarker(memory));

      console.log(this.markers);


    });
  }
  

  // private calculateBoundsForMemories(memories: any[]) {
  //   const validCoordinates = memories
  //     .filter(memory => memory.longitude !== undefined && memory.latitude !== undefined)
  //     .map(memory => [memory.longitude, memory.latitude]);
  
  //   if (validCoordinates.length === 0) {
  //     console.error('Brak prawidłowych współrzędnych w memories.');
  //     return new mapboxgl.LngLatBounds();
  //   }
  
  //   const bounds = validCoordinates.reduce((bounds, coord) => {
  //     return bounds.extend(coord);
  //   }, new mapboxgl.LngLatBounds(validCoordinates[0], validCoordinates[0]));
  
  //   return bounds;
  // }

  createMemoryMarker(memory: any) {
    // console.log('Adding marker for memory:', memory);
  
    const { latitude, longitude } = memory;
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      console.error('Invalid coordinates for memory:', memory);
      return;
    }
    console.log(parseFloat(latitude), parseFloat(longitude));

    // this.map.addControl(new mapboxgl.AttributionControl({
    //   customAttribution: 'Map design by me'
    //   }));
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
      }));
    return new mapboxgl.Marker()
        .setLngLat([0.0, 0.0])
        // .setLngLat([parseFloat(longitude), parseFloat(latitude)])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${memory.name}</h3><p>${memory.description}</p>`))
        .addTo(this.map);
  
      // this.markers.push(marker);

  }
  
  
  

  
  
}
