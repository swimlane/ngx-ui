import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon';
import { LongPressComponent } from './long-press.component';

@NgModule({
  declarations: [LongPressComponent],
  exports: [LongPressComponent],
  imports: [CommonModule, IconModule ]
})
export class LongPressModule {}
