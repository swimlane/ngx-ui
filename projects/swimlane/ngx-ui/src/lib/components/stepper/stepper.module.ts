import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResizeObserverModule } from '../../directives';

import { StepperComponent } from './stepper.component';
import { StepComponent } from './step.component';
import { StepContentDirective } from './step-content.directive';

@NgModule({
  imports: [CommonModule, ResizeObserverModule],
  declarations: [StepperComponent, StepComponent, StepContentDirective],
  exports: [StepperComponent, StepComponent, StepContentDirective]
})
export class StepperModule {}
