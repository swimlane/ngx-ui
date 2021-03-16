import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LongPressDirective } from './long-press.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [LongPressDirective],
  exports: [LongPressDirective],
})
export class LongPressModule {}
