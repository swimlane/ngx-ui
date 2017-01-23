import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DblClickCopyDirective } from './dbl-click-copy.directive';
import { VisibilityDirective } from './visibility.directive';

@NgModule({
  declarations: [VisibilityDirective, DblClickCopyDirective],
  exports: [VisibilityDirective, DblClickCopyDirective],
  imports: [CommonModule]
})
export class DirectivesModule { }
