import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from './filter.pipe';
import { DecamelizePipe } from './decamelize.pipe';
import { JSONTreePipe } from './json-tree.pipe';
import { TimeZonePipe } from './timezone.pipe';

@NgModule({
  declarations: [FilterPipe, DecamelizePipe, JSONTreePipe, TimeZonePipe],
  exports: [FilterPipe, DecamelizePipe, JSONTreePipe, TimeZonePipe],
  imports: [CommonModule]
})
export class PipesModule {}
