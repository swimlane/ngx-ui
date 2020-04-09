import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProgressSpinnerMode } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-progress-spinner-page',
  templateUrl: './progress-spinner-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerPageComponent {
  diameter = 100;
  strokeWidth = 5;
  value = 35;
  total = 100;
  color = '#1483FF';
  mode = ProgressSpinnerMode.Indeterminate;
  small = false;
}
