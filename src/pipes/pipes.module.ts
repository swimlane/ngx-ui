import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IterableMapPipe } from './iterable-map.pipe';
import { FilterPipe } from './filter.pipe';
import { DecamalizePipe } from './decamelize.pipe';

const declarations = [
  IterableMapPipe, 
  FilterPipe,
  DecamalizePipe
];

@NgModule({
  declarations: [...declarations],
  exports: declarations,
  imports: [CommonModule]
})
export class PipesModule { }
