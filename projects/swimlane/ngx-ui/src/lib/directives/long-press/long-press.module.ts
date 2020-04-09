import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LongPressDirective } from './long-press.directive';

@NgModule({
  declarations: [LongPressDirective],
  exports: [LongPressDirective],
  imports: [CommonModule]
})
export class LongPressModule {}
