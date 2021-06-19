import { NgModule } from '@angular/core';
import { LongPressDirective } from './long-press.directive';

@NgModule({
  declarations: [LongPressDirective],
  exports: [LongPressDirective],
})
export class LongPressModule {}
