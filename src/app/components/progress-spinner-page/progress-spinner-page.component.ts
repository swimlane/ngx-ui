import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressSpinnerMode } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-progress-spinner-page',
  templateUrl: './progress-spinner-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressSpinnerPageComponent {
  diameter = 100;
  strokeWidth = 3;
  value = 35;
  total = 100;
  color = '#1483FF';
  mode = ProgressSpinnerMode.Indeterminate;
  small = false;
  isFailure = false;
  showIcon = true;
  spinnerLabel = {
    inProgressLabel: 'Uploading...',
    failLabel: 'Upload Failed',
    completeLabel: 'Upload Successful'
  };

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
