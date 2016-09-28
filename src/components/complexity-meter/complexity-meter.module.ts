import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplexityMeterComponent } from './complexity-meter.component';

@NgModule({
  declarations: [ComplexityMeterComponent],
  exports: [ComplexityMeterComponent],
  imports: [CommonModule]
})
export class ComplexityMeterModule { }
