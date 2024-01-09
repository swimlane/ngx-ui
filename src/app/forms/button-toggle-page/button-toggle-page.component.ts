import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-button-toggle-page',
  templateUrl: './button-toggle-page.component.html',
  styleUrls: ['./button-toggle-page.component.scss']
})
export class ButtonTogglePageComponent {
  seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
  season: string;

  favoriteSeason = this.seasons[1];
  secondFavoriteSeason;
  disabled = false;
  form = new UntypedFormGroup({
    season: new UntypedFormControl(this.seasons[1])
  });

  groupDisabled = true;

  addSeason() {
    this.seasons.push('Holiday');
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
