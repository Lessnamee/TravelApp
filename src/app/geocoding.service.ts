import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private apiKey = 'AIzaSyCdt1KJv6GQ22rMxQmDZx6V1HxlFpwe8Fw';

  constructor(private http: HttpClient) {}

  getCoordinatesByAddress(address: string): Observable<any> {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.apiKey}`;
    return this.http.get(apiUrl);
  }
}

