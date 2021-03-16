import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityDirective } from './visibility.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [VisibilityDirective],
  exports: [VisibilityDirective]
})
export class VisibilityModule {}
