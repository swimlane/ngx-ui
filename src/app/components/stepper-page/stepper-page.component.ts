import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stepper-page',
  templateUrl: './stepper-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperPageComponent {
  steps = 9;
  index = 2;
  clickable = false;

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

  addStep() {
    this.steps++;
  }
}
