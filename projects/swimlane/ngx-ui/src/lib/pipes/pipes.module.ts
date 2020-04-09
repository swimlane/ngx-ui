import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterModule } from './filter/filter.module';
import { DecamelizeModule } from './decamelize/decamelize.module';
import { JSONTreeModule } from './json-tree/json-tree.module';
import { TimeZoneModule } from './time-zone/time-zone.module';
import { CammelToSnakeModule } from './cammel-to-snake/cammel-to-snake.module';

@NgModule({
  exports: [TimeZoneModule, DecamelizeModule, FilterModule, JSONTreeModule, CammelToSnakeModule],
  imports: [CommonModule, TimeZoneModule, DecamelizeModule, FilterModule, JSONTreeModule, CammelToSnakeModule],
})
export class PipesModule {}
