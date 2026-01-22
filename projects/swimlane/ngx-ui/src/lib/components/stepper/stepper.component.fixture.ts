/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { StepperComponent } from './stepper.component';
import { StepperPosition } from './stepper-position.enum';

@Component({
  selector: 'ngx-stepper-fixture',
  template: `
    <ngx-stepper [(active)]="step" [completeIcon]="icon" [position]="position" [readonly]="readonly">
      <ngx-step></ngx-step>
      <ngx-step></ngx-step>
      <ngx-step completeIcon="ngx-icon ngx-arrow-right"></ngx-step>
    </ngx-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class StepperComponentFixture {
  @ViewChild(StepperComponent, { static: false })
  readonly stepper: StepperComponent;

  step = 1;
  position = StepperPosition.Top;
  icon = 'ngx-icon ngx-check';
  readonly = false;
}
