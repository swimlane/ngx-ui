import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-page',
  templateUrl: './radio-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioPageComponent {
  favoriteSeason = 'Spring';
  secondFavoriteSeason = 'Summer';
  disabled = false;
  seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
  season: string;
  form: UntypedFormGroup;

  constructor(fb: UntypedFormBuilder) {
    this.form = fb.group({
      season: 'Spring'
    });
  }
}
