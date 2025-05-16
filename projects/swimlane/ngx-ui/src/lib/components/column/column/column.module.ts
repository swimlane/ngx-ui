import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ColumnComponent } from './column.component';
import { ColumnWrapperComponent } from './column-wrapper.component';
import { InputModule } from '../../input/input.module';
import { IconModule } from '../../icon/icon.module';

@NgModule({
  declarations: [ColumnComponent, ColumnWrapperComponent],
  imports: [CommonModule, InputModule, IconModule, ScrollingModule],
  exports: [ColumnComponent, ColumnWrapperComponent]
})
export class ColumnModule {}
