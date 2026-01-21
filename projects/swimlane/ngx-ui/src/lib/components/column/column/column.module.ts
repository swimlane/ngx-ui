import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ColumnComponent } from './column.component';
import { InputModule } from '../../input/input.module';
import { IconModule } from '../../icon/icon.module';

@NgModule({
  declarations: [ColumnComponent],
  imports: [CommonModule, InputModule, IconModule, ScrollingModule, CommonModule],
  exports: [ColumnComponent]
})
export class ColumnModule {}
