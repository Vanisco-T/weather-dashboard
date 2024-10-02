import {
  provideHttpClient,
} from '@angular/common/http'; // Import provideHttpClient
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {
  AppRoutingModule,
} from './app-routing.module'; // Import the routing module
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

@NgModule({
  declarations: [
    AppComponent,
    WeatherDisplayComponent,
    ForecastDisplayComponent,
    CitySearchComponent,
    // other components
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule // Add the routing module here
  ],
  providers: [
    provideHttpClient() // Use the new provideHttpClient here
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
