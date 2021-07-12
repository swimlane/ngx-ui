import { NgModule } from '@angular/core';
import { MarginlessControllerDirective } from './marginless.controller';

@NgModule({
  declarations: [MarginlessControllerDirective],
  exports: [MarginlessControllerDirective],
})
export class MarginlessModule {}
