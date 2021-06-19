import { NgModule } from '@angular/core';
import { ResizeObserverDirective } from './resize-observer.directive';

@NgModule({
  declarations: [ResizeObserverDirective],
  exports: [ResizeObserverDirective],
})
export class ResizeObserverModule {}
