import { NgModule } from '@angular/core';
import { SizeControllerDirective } from './size.controller';

@NgModule({
  declarations: [SizeControllerDirective],
  exports: [SizeControllerDirective],
})
export class SizeModule {}
