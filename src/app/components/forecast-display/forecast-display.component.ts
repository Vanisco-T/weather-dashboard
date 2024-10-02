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
  forecastData: any;

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) {}

  ngOnInit() {
    const city = this.route.snapshot.paramMap.get('city');
    this.weatherService.getForecast(city!).subscribe(data => {
      this.forecastData = data;
    });
  }
}
