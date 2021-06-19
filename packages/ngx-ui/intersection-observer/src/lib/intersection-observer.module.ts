import { NgModule } from '@angular/core';
import { IntersectDirective } from './intersect.directive';
import { IntersectionObserveeDirective } from './intersection-observee.directive';
import { IntersectionObserverRootDirective } from './intersection-observer-root.directive';
import { IntersectionObserverDirective } from './intersection-observer.directive';

@NgModule({
  declarations: [
    IntersectionObserverDirective,
    IntersectDirective,
    IntersectionObserveeDirective,
    IntersectionObserverRootDirective,
  ],
  exports: [
    IntersectionObserverDirective,
    IntersectDirective,
    IntersectionObserveeDirective,
    IntersectionObserverRootDirective,
  ],
})
export class IntersectionObserverModule {}
