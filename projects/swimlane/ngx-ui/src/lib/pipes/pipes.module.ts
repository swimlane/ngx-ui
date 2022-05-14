import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterModule } from './filter/filter.module';
import { DecamelizeModule } from './decamelize/decamelize.module';
import { JSONTreeModule } from './json-tree/json-tree.module';
import { TimeZoneModule } from './time-zone/time-zone.module';
import { CamelToSnakeModule } from './camel-to-snake/camel-to-snake.module';

NgModule;
@NgModule({
  exports: [TimeZoneModule, DecamelizeModule, FilterModule, JSONTreeModule, CamelToSnakeModule],
  imports: [CommonModule, TimeZoneModule, DecamelizeModule, FilterModule, JSONTreeModule, CamelToSnakeModule]
})
export class PipesModule {}
