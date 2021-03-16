import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResizeObserverModule } from '@swimlane/ngx-ui/directives/resize-observer';
import { StepContentDirective } from './directives';
import { StepComponent } from './step/step.component';
import { StepperComponent } from './stepper.component';

@NgModule({
  imports: [CommonModule, ResizeObserverModule],
  declarations: [StepperComponent, StepComponent, StepContentDirective],
  exports: [StepperComponent, StepComponent]
})
export class StepperModule {}
