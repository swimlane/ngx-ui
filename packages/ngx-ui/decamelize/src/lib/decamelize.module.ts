import { NgModule } from '@angular/core';
import { DecamelizePipe } from './decamelize.pipe';

@NgModule({
  declarations: [DecamelizePipe],
  exports: [DecamelizePipe],
})
export class DecamelizeModule {}
