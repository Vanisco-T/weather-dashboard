import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent {
  city: string = '';

  @Output() citySelected = new EventEmitter<string>();

  onSubmit() {
    if (this.city) {
      this.citySelected.emit(this.city);
    }
  }
}
