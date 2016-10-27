import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IterableMapPipe } from './iterable-map.pipe';

const declarations = [IterableMapPipe];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule]
})
export class PipesModule { }
