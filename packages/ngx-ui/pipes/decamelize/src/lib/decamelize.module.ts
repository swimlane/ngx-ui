import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecamelizePipe } from './decamelize.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [DecamelizePipe],
  exports: [DecamelizePipe]
})
export class DecamelizeModule {}
