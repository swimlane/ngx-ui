import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterModule } from './filter/filter.module';
import { DecamelizeModule } from './decamelize/decamelize.module';
import { JSONTreePipe } from './json-tree.pipe';
import { TimeZonePipe } from './timezone.pipe';

@NgModule({
  declarations: [JSONTreePipe, TimeZonePipe],
  exports: [JSONTreePipe, TimeZonePipe, DecamelizeModule, FilterModule],
  imports: [CommonModule, DecamelizeModule, FilterModule]
})
export class PipesModule {}
