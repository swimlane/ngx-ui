import { Component } from '@angular/core';

@Component({
  selector: 'app-radio-page',
  templateUrl: './radio-page.component.html'
})
export class RadioPageComponent {
  favoriteSeason: string = 'Spring';
  secondFavoriteSeason: string;
  disabled = false;
  seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];

}
