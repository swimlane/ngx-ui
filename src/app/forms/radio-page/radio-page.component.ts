import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-radio-page',
  templateUrl: './radio-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioPageComponent {
  favoriteSeason = 'Spring';
  secondFavoriteSeason: string;
  disabled = false;
  seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
  season: string;
}
