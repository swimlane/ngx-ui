import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DblClickCopyDirective } from './dbl-click-copy.directive';
import { VisibilityDirective } from './visibility.directive';
import { LongPressDirective } from './long-press.directive';

@NgModule({
  declarations: [VisibilityDirective, DblClickCopyDirective, LongPressDirective],
  exports: [VisibilityDirective, DblClickCopyDirective, LongPressDirective],
  imports: [CommonModule]
})
export class DirectivesModule { }
