import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisibilityDirective } from './visibility.directive';

@NgModule({
  declarations: [VisibilityDirective],
  exports: [VisibilityDirective],
  imports: [CommonModule],
})
export class VisibilityModule {}
