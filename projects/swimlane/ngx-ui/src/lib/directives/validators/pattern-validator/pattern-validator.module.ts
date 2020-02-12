import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatternValidatorDirective } from './pattern-validator.directive';

@NgModule({
  declarations: [PatternValidatorDirective],
  exports: [PatternValidatorDirective],
  imports: [CommonModule]
})
export class PatternValidatorModule {}
