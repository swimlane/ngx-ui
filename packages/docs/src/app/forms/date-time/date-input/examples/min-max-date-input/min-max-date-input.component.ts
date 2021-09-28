import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

@Component({
  selector: 'docs-min-max-date-input',
  templateUrl: './min-max-date-input.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinMaxDateInputComponent {
  readonly minDate = new Date(Date.now());
  readonly maxDate = new Date(Date.now() + ONE_WEEK_IN_MS);
  readonly helpfulHint = `Select date between ${this.minDate.toLocaleDateString()} and ${this.maxDate.toLocaleDateString()}`;

  dateControl = new FormControl(new Date(Date.now() + ONE_WEEK_IN_MS / 2));
}
