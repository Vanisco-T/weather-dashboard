import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '15eed42146183fde19aece869f5a26d4';
  private apiUrl = 'https://api.openweathermap.org/data/2.5';
   // BehaviorSubject to hold the default weather data
   private defaultDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
   public defaultData$: Observable<any> = this.defaultDataSubject.asObservable();
   //Behaviour to hold 7 days forcast data
   private dataForcastSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
   public forcastData$: Observable<any> = this.dataForcastSubject.asObservable();
 
  constructor(private http: HttpClient) {}
  isCelsius: boolean = true; // Default to Celsius
   // Toggle unit
   toggleTemperatureUnit(event: any): void {
    this.isCelsius = !this.isCelsius;
  }
   // Function to display temperature based on the selected unit
   displayTemperature(tempInKelvin: number): number {
    if (this.isCelsius) {
      return tempInKelvin - 273.15;
    } else {
      return (tempInKelvin - 273.15) * 9/5 + 32;
    }
  }
   // Method to set the default weather data
   setDefaultData(data: any): void {
    this.defaultDataSubject.next(data); // Update the BehaviorSubject
  }
  // Method to get the default weather data as Observable
   getDefaultData(): Observable<any> {
    return this.defaultData$;
  }

   // Method to set the forcast weather data
   setForcastData(data: any): void {
    this.dataForcastSubject.next(data); // Update the BehaviorSubject
  }
  // Method to get the forcast weather data as Observable
   getForcastData(): Observable<any> {
    return this.forcastData$;
  }



  // Method to get weather by latitude and longitude
  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
  }

  // Method to get weather by city name
  getWeather(city: string): Observable<any> {
    return this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${this.apiKey}`);
  }
  
  // Method to get forecast by lat and lon
  getForecast(lat: number, lon: number): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/3.0/onecall?&lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
  }
}
