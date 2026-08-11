import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DblClickCopyModule } from './dbl-click-copy/dbl-click-copy.module';
import { VisibilityModule } from './visibility/visibility.module';
import { LongPressModule } from './long-press/long-press.module';
import { InViewportModule } from './in-viewport/in-viewport.module';

import { PatternValidatorModule } from './validators/pattern-validator/pattern-validator.module';

@NgModule({
  exports: [VisibilityModule, DblClickCopyModule, LongPressModule, PatternValidatorModule, InViewportModule],
  imports: [
    CommonModule,
    VisibilityModule,
    DblClickCopyModule,
    LongPressModule,
    PatternValidatorModule,
    InViewportModule
  ]
})
export class DirectivesModule {}
