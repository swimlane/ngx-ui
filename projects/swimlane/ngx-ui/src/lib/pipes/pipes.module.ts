import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from './filter.pipe';
import { DecamelizePipe } from './decamelize.pipe';
import { JSONTreePipe } from './json-tree.pipe';
import { TimeZonePipe } from './timezone.pipe';
import { CammelToSnakePipe } from './cammel-to-snake.pipe';

@NgModule({
  declarations: [FilterPipe, DecamelizePipe, JSONTreePipe, TimeZonePipe, CammelToSnakePipe],
  exports: [FilterPipe, DecamelizePipe, JSONTreePipe, TimeZonePipe, CammelToSnakePipe],
  imports: [CommonModule]
})
export class PipesModule {}
