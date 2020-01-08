import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DblClickCopyModule } from './dbl-click-copy/dbl-click-copy.module';
import { VisibilityModule } from './visibility/visibility.module';
import { LongPressModule } from './long-press/long-press.module';
import { PatternValidatorDirective } from './validators/pattern-validator.directive';

@NgModule({
  declarations: [PatternValidatorDirective],
  exports: [VisibilityModule, DblClickCopyModule, LongPressModule],
  imports: [CommonModule, VisibilityModule, DblClickCopyModule, LongPressModule]
})
export class DirectivesModule {}
