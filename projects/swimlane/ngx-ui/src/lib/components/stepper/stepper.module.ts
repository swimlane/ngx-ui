import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperComponent } from './stepper.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StepperComponent],
  exports: [StepperComponent]
})
export class StepperModule {}
