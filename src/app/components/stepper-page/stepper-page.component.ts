import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StepperDirection } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-stepper-page',
  templateUrl: './stepper-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperPageComponent {
  readonly StepperDirection = StepperDirection;

  steps = 9;
  index = 2;
  clickable = false;
  direction = StepperDirection.Horizontal;

  next() {
    if (this.index < this.steps - 1) {
      this.index++;
    }
  }

  previous() {
    if (this.index > 0) {
      this.index--;
    }
  }

  toggleClickable() {
    this.clickable = !this.clickable;
  }

  toggleDirection() {
    this.direction = this.direction === StepperDirection.Horizontal ? StepperDirection.Vertical
                                                                    : StepperDirection.Horizontal;
  }

  addStep() {
    this.steps++;
  }
}
