import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InViewportDirective } from './in-viewport.directive';

@NgModule({
  declarations: [InViewportDirective],
  exports: [InViewportDirective],
  imports: [CommonModule]
})
export class InViewportModule {}
