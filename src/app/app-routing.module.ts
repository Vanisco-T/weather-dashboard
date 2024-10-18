import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  ForecastDisplayComponent,
} from './components/forecast-display/forecast-display.component';
import {
  WeatherDisplayComponent,
} from './components/weather-display/weather-display.component';

const routes: Routes = [
  { path: '', redirectTo: '/current-weather', pathMatch: 'full' }, // Default route
  { path: 'current-weather', component: WeatherDisplayComponent },
  { path: 'forecast', component: ForecastDisplayComponent },
  { path: '**', redirectTo: '/current-weather' } // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
