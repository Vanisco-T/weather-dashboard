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
  { path: 'weather/:city', component: WeatherDisplayComponent },
  { path: 'forecast/:city', component: ForecastDisplayComponent },
  { path: '', redirectTo: '/weather/London', pathMatch: 'full' },
  { path: '**', redirectTo: '/weather/London' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
