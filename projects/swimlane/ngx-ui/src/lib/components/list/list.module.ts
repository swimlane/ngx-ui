import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { ListRowComponent } from './list-row/list-row.component';
import { ListColumnComponent } from './list-column/list-column.component';
import { CommonModule } from '@angular/common';
import { ListColumnTemplateDirective } from './list-column/list-column-template.directive';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListHeaderTemplateDirective } from './list-header/list-header-template.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    ListComponent,
    ListRowComponent,
    ListColumnComponent,
    ListHeaderComponent,
    ListColumnTemplateDirective,
    ListHeaderTemplateDirective
  ],
  imports: [CommonModule, ScrollingModule],
  exports: [
    ListComponent,
    ListRowComponent,
    ListColumnComponent,
    ListHeaderComponent,
    ListColumnTemplateDirective,
    ListHeaderTemplateDirective
  ]
})
export class ListModule {}
