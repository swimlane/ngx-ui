import { NgModule } from '@angular/core';
import { AutosizeControllerDirective } from './autosize.controller';

@NgModule({
  declarations: [AutosizeControllerDirective],
  exports: [AutosizeControllerDirective],
})
export class AutosizeModule {}
