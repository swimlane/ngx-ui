import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StepperPosition } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-stepper-page',
  templateUrl: './stepper-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperPageComponent {
  readonly StepperPosition = StepperPosition;
  readonly steps: Array<{ readonly title: string; readonly icon?: string; readonly completeIcon?: string }> = [
    { title: 'step 1', icon: 'ngx-icon ngx-cloud-download' },
    { title: 'step 2', icon: 'ngx-icon ngx-rocket' },
    { title: 'step 3', icon: 'ngx-icon ngx-bell-alarm' },
    { title: 'step 4', icon: 'ngx-icon ngx-cloud-upload' }
  ];

  index = 2;
  readonly = true;
  position = StepperPosition.Left;

  next() {
    if (this.index < this.steps.length - 1) {
      this.index++;
    }
  }

  previous() {
    if (this.index > 0) {
      this.index--;
    }
  }

  toggleReadonly() {
    this.readonly = !this.readonly;
  }

  addStep() {
    this.steps.push({
      title: 'next step',
      icon: 'ngx-icon ngx-bug'
    });
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
