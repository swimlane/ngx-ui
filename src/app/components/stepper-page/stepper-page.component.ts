import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stepper-page',
  templateUrl: './stepper-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperPageComponent {
  index = 2;
  clickable = false;

  next() {
    this.index++;
  }

  previous() {
    this.index--;
  }

  toggleClickable() {
    this.clickable = !this.clickable;
  }
}
