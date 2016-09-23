import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ComplexityMeterComponent } from './complexity-meter.component';

@NgModule({
  declarations: [ComplexityMeterComponent],
  exports: [ComplexityMeterComponent],
  imports: [BrowserModule]
})
export class ComplexityMeterModule { }
