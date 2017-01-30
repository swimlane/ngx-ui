import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IterableMapPipe } from './iterable-map.pipe';
import { FilterPipe } from './filter.pipe';
import { DecamalizePipe } from './decamelize.pipe';

@NgModule({
  declarations: [
    IterableMapPipe, 
    FilterPipe,
    DecamalizePipe
  ],
  exports: [
    IterableMapPipe, 
    FilterPipe,
    DecamalizePipe
  ],
  imports: [CommonModule]
})
export class PipesModule { }
