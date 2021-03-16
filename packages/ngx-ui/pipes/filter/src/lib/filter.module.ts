import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterByPipe } from './filter-by.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FilterByPipe],
  exports: [FilterByPipe]
})
export class FilterModule {}
