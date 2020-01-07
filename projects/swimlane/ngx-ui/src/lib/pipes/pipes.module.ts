import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterModule } from './filter/filter.module';
import { DecamelizeModule } from './decamelize/decamelize.module';
import { JSONTreeModule } from './json-tree/json-tree.module';
import { TimeZonePipe } from './timezone.pipe';

@NgModule({
  declarations: [TimeZonePipe],
  exports: [TimeZonePipe, DecamelizeModule, FilterModule, JSONTreeModule],
  imports: [CommonModule, DecamelizeModule, FilterModule, JSONTreeModule]
})
export class PipesModule {}
