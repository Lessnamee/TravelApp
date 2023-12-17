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

  private warsawCoordinates = [21.00, 52.13];

  constructor(private afs: AngularFirestore) {
    mapboxgl.accessToken = this.mapboxToken;
  }

  initializeMap(container: string) {
    this.map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [...this.warsawCoordinates],
      zoom: 2,
    });

    this.loadMemories();
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

  loadMemories() {
    this.clearMarkers();

    this.afs.collection('memories').valueChanges().subscribe((memories: any[]) => {
      this.markers = memories.map(memory => this.createMemoryMarker(memory));
    });
  }

  createMemoryMarker(memory: any) {
    const { latitude, longitude } = memory;
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      console.error('Invalid coordinates for memory:', memory);
      return;
    }

    return new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${memory.name}</h3><p>${memory.description}</p>`))
      .addTo(this.map);
  }
}
