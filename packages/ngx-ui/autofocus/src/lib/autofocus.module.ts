import { NgModule } from '@angular/core';
import { AutofocusControllerDirective } from './autofocus.controller';

@NgModule({
  declarations: [AutofocusControllerDirective],
  exports: [AutofocusControllerDirective],
})
export class AutofocusModule {}
