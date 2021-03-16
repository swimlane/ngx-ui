import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SplitAreaDirective, SplitDirective } from './directives';
import { SplitHandleComponent } from './split-handle/split-handle.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SplitDirective, SplitHandleComponent, SplitAreaDirective],
  exports: [SplitDirective, SplitHandleComponent, SplitAreaDirective]
})
export class SplitModule {}
