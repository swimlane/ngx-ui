import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JSONTreePipe } from './json-tree.pipe';

@NgModule({
  declarations: [JSONTreePipe],
  exports: [JSONTreePipe],
  imports: [CommonModule],
})
export class JSONTreeModule {}
