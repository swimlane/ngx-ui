import { NgModule } from '@angular/core';
import { IntersectDirective } from './intersect.directive';
import { IntersectionObserveeDirective } from './intersection-observee.directive';
import { IntersectionObserverRootDirective } from './intersection-observer-root.directive';
import { IntersectionObserverDirective } from './intersection-observer.directive';

@NgModule({
  declarations: [
    IntersectDirective,
    IntersectionObserverDirective,
    IntersectionObserveeDirective,
    IntersectionObserverRootDirective,
  ],
  exports: [
    IntersectDirective,
    IntersectionObserverDirective,
    IntersectionObserveeDirective,
    IntersectionObserverRootDirective,
  ],
})
export class IntersectionObserverModule {}
