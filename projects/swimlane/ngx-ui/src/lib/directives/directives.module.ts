import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DblClickCopyModule } from './dbl-click-copy/dbl-click-copy.module';
import { VisibilityDirective } from './visibility.directive';
import { LongPressDirective } from './long-press.directive';
import { PatternValidatorDirective } from './validators/pattern-validator.directive';

@NgModule({
  declarations: [VisibilityDirective, LongPressDirective, PatternValidatorDirective],
  exports: [VisibilityDirective, DblClickCopyModule, LongPressDirective],
  imports: [CommonModule, DblClickCopyModule]
})
export class DirectivesModule {}
