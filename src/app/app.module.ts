import { provideHttpClient } from '@angular/common/http'; // HttpClient setup
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  CitySearchComponent,
} from './components/city-search/city-search.component';
import {
  ForecastDisplayComponent,
} from './components/forecast-display/forecast-display.component';
import {
  WeatherDisplayComponent,
} from './components/weather-display/weather-display.component';

Chart.register(ChartDataLabels);
@NgModule({
  declarations: [
    AppComponent,
    WeatherDisplayComponent,
    ForecastDisplayComponent,
    CitySearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule,  // Add this line
    HighchartsChartModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}
