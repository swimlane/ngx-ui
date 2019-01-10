import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IterableMapPipe } from './iterable-map.pipe';
import { FilterPipe } from './filter.pipe';
import { DecamalizePipe } from './decamelize.pipe';
import { JSONTreePipe } from './json-tree.pipe';
import { TimeZonePipe } from './timezone.pipe';

@NgModule({
  declarations: [IterableMapPipe, FilterPipe, DecamalizePipe, JSONTreePipe, TimeZonePipe],
  exports: [IterableMapPipe, FilterPipe, DecamalizePipe, JSONTreePipe, TimeZonePipe],
  imports: [CommonModule]
})
export class PipesModule {}
