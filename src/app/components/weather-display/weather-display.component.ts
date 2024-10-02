import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss']
})
export class WeatherDisplayComponent implements OnInit {
  weatherData: any;

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) {}

  ngOnInit() {
    const city = this.route.snapshot.paramMap.get('city');
    this.weatherService.getWeather(city!).subscribe(data => {
      this.weatherData = data;
    });
  }
}
