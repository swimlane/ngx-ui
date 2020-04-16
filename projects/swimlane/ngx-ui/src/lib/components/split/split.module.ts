import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplitDirective } from './split.directive';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';

@NgModule({
  declarations: [SplitDirective, SplitAreaDirective, SplitHandleComponent],
  exports: [SplitDirective, SplitAreaDirective, SplitHandleComponent],
  imports: [CommonModule]
})
export class SplitModule {}
