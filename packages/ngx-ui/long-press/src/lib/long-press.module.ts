import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LongPressDirective } from './long-press.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [LongPressDirective],
  exports: [LongPressDirective],
})
export class LongPressModule {}
