import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResizeObserverDirective } from './resize-observer.directive';

@NgModule({
  declarations: [ResizeObserverDirective],
  exports: [ResizeObserverDirective],
  imports: [CommonModule],
})
export class ResizeObserverModule {}
