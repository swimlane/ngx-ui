import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StepperPosition } from '@swimlane/ngx-ui';
import * as faker from 'faker';

@Component({
  selector: 'app-stepper-page',
  templateUrl: './stepper-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperPageComponent {
  readonly StepperPosition = StepperPosition;
  readonly steps: Array<{ readonly title: string; readonly icon?: string; }> = [
    { title: faker.random.word() },
    { title: faker.random.word() },
    { title: faker.random.word() },
    { title: faker.random.word() }
  ];

  index = 2;
  clickable = false;
  position = StepperPosition.Top;

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

  toggleClickable() {
    this.clickable = !this.clickable;
  }

  addStep() {
    this.steps.push({
      title: faker.random.word(),
      icon: 'ngx-icon ngx-bug'
    });
  }
}
