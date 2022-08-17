import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-page',
  templateUrl: './radio-page.component.html',
  styleUrls: ['./radio-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioPageComponent {
  favoriteSeason = 'Spring';
  secondFavoriteSeason = 'Summer';
  disabled = false;
  seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
  season: string;
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      season: 'Spring'
    });
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
