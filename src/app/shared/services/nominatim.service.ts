import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NominatimService {
  private apiUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  getCoordinatesByAddress(address: string): Observable<any> {
    const params = {
      q: address,
      format: 'json',
    };

    return this.http.get(this.apiUrl, { params });
  }
}
