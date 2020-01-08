import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DblClickCopyModule } from './dbl-click-copy/dbl-click-copy.module';
import { VisibilityModule } from './visibility/visibility.module';
import { LongPressModule } from './long-press/long-press.module';

import * as validators from './validators';

@NgModule({
  exports: [VisibilityModule, DblClickCopyModule, LongPressModule, validators.PatternValidatorModule],
  imports: [CommonModule, VisibilityModule, DblClickCopyModule, LongPressModule, validators.PatternValidatorModule]
})
export class DirectivesModule {}
