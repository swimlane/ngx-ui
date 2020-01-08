import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DblClickCopyModule } from './dbl-click-copy/dbl-click-copy.module';
import { VisibilityDirective } from './visibility.directive';
import { LongPressModule } from './long-press/long-press.module';
import { PatternValidatorDirective } from './validators/pattern-validator.directive';

@NgModule({
  declarations: [VisibilityDirective, PatternValidatorDirective],
  exports: [VisibilityDirective, DblClickCopyModule, LongPressModule],
  imports: [CommonModule, DblClickCopyModule, LongPressModule]
})
export class DirectivesModule {}
