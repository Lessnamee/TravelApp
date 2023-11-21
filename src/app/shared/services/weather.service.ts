import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'b030a33156f633c1455069ed8084d964'; 

  constructor(private httpClient: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
    return this.httpClient.get(apiUrl);
  }

  getForecast(city: string, date: string): Observable<any> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}`;
    return this.httpClient.get(apiUrl);
  }
}




