import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'YOUR_API_KEY';
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/weather?q=${city}&units=metric&appid=${this.apiKey}`);
  }

  getForecast(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/forecast?q=${city}&units=metric&appid=${this.apiKey}`);
  }
}
