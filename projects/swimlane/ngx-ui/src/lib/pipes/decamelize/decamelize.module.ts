import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecamelizePipe } from './decamelize.pipe';

@NgModule({
  declarations: [DecamelizePipe],
  exports: [DecamelizePipe],
  imports: [CommonModule]
})
export class DecamelizeModule { }
