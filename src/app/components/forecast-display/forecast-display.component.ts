import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-forecast-display',
  templateUrl: './forecast-display.component.html',
  styleUrls: ['./forecast-display.component.scss']
})
export class ForecastDisplayComponent implements OnInit {
  forcastData: any;
  selectedDay: any = null; // Holds the data of the selected forecast day


  constructor(private route: ActivatedRoute, public weatherService: WeatherService) {}

  ngOnInit(): void {
    // Subscribe to the defaultData$ Observable
    this.weatherService.getDefaultData().subscribe(
      (data) => {
        if (data) {
           this.weatherService.getForecast(data.coord.lat,data.coord.lon).subscribe(dataForcast => {
            this.weatherService.setForcastData(dataForcast);
            this.weatherService.getForcastData().subscribe(
              (data) => {
                if (data) {           
                  console.log(data)       
                  this.forcastData = data;
                }
              },
              (error) => {
                console.error('Error retrieving weather data:', error);
              }
            );
          }); 
        }
      },
      (error) => {
        console.error('Error retrieving weather data:', error);
      }
    );

  }
  // Wrapper method to call displayTemperature from the service
  displayTemperature(tempInKelvin: number): number {
    return this.weatherService.displayTemperature(tempInKelvin);
  }
  // Method to toggle temperature unit by calling the service
  toggleTemperatureUnit(): void {
    this.weatherService.toggleTemperatureUnit(null); // Call toggle method in service
  }
  // Opens the modal and sets the selected day's details
  openModal(day: any): void {
    this.selectedDay = day;
  }

  // Closes the modal
  closeModal(): void {
    this.selectedDay = null;
  }
}
