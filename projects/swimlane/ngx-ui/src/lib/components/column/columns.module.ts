import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnsComponent } from './columns.component';
import { ColumnModule } from './column/column.module';

@NgModule({
  declarations: [ColumnsComponent],
  imports: [CommonModule, ColumnModule],
  exports: [ColumnsComponent]
})
export class ColumnsModule {}
