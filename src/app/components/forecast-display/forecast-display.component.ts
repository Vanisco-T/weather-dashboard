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

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) {}

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
}
