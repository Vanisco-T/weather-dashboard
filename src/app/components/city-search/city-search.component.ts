import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit {
  city: string = '';
  defaultData : any;
  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    @Inject(PLATFORM_ID) private platformId: Object
    ) {}
    ngOnInit(): void {
      // Ensure the geolocation code runs only in the browser context
      if (isPlatformBrowser(this.platformId)) {
        this.getUserLocation();
      }
    }
    getUserLocation(): void {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            // Now call the service to get weather data using the coordinates
            this.weatherService.getWeatherByCoordinates(lat, lon).subscribe(
              (data) => {
                this.weatherService.setDefaultData(data);
              },
              (error) => {
                console.error('Error fetching weather data: ', error);
              }
            );
          },
          (error) => {
            console.error('Error getting location: ', error);
            // Handle the case where user denies access or an error occurs use lat 0 and lon 0as default
            const lat = 0;
            const lon = 0;
            // Now call the service to get weather data using the coordinates
            this.weatherService.getWeatherByCoordinates(lat, lon).subscribe(
              (data) => {
                this.weatherService.setDefaultData(data);
              },
              (error) => {
                console.error('Error fetching weather data: ', error);
              }
            );
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }

    }

     @Output() citySelected = new EventEmitter<string>();

  onSubmit() {
    if (this.city) {
      this.citySelected.emit(this.city);
      this.weatherService.getWeather(this.city).subscribe(data => {
        if(data){
          this.weatherService.getWeatherByCoordinates(data[0].lat, data[0].lon).subscribe(
            (data) => {
              console.log(data)
              this.weatherService.setDefaultData(data);
            },
            (error) => {
              console.error('Error fetching weather data: ', error);
            }
          );
        }
      });
    }
    /* this.weatherService.lat=this.resultData.lat
    this.weatherService.lon=this.resultData.lon */
    
  }
}
