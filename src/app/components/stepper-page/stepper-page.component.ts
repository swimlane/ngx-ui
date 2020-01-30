import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stepper-page',
  templateUrl: './stepper-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperPageComponent {
  index = 2;

  next() {
    this.index++;
  }

  previous() {
    this.index--;
  }
}
