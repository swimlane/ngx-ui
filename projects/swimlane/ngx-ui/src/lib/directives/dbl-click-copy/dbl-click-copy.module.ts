import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DblClickCopyDirective } from './dbl-click-copy.directive';

@NgModule({
  declarations: [DblClickCopyDirective],
  exports: [DblClickCopyDirective],
  imports: [CommonModule],
})
export class DblClickCopyModule {}
