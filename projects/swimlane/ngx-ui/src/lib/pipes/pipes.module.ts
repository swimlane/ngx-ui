import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from './filter.pipe';
import { DecamelizeModule } from './decamelize/decamelize.module';
import { JSONTreePipe } from './json-tree.pipe';
import { TimeZonePipe } from './timezone.pipe';

@NgModule({
  declarations: [FilterPipe, JSONTreePipe, TimeZonePipe],
  exports: [FilterPipe, JSONTreePipe, TimeZonePipe],
  imports: [CommonModule, DecamelizeModule]
})
export class PipesModule {}
