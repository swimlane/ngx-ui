import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResizeObserverModule } from '../../directives';

import { StepperComponent } from './stepper.component';
import { StepComponent } from './step.component';

@NgModule({
  imports: [CommonModule, ResizeObserverModule],
  declarations: [StepperComponent, StepComponent],
  exports: [StepperComponent, StepComponent]
})
export class StepperModule {}
