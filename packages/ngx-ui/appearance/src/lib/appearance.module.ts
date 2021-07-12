import { NgModule } from '@angular/core';
import { AppearanceControllerDirective } from './appearance.controller';

@NgModule({
  declarations: [AppearanceControllerDirective],
  exports: [AppearanceControllerDirective],
})
export class AppearanceModule {}
