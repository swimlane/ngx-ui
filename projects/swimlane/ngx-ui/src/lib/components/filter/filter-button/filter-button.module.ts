import { NgModule } from '@angular/core';
import { FilterButtonComponent } from './filter-button.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FilterButtonComponent],
  exports: [FilterButtonComponent],
  imports: [CommonModule]
})
export class FilterButtonModule {}
