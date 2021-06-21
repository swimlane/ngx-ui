import { Directive, ElementRef } from '@angular/core';
import { INTERSECTION_OBSERVER_ROOT } from './tokens';

@Directive({
  selector: '[ngxIntersectionObserverRoot]',
  exportAs: 'ngxIntersectionObserverRoot',
  providers: [
    {
      provide: INTERSECTION_OBSERVER_ROOT,
      useExisting: ElementRef,
    },
  ],
})
export class IntersectionObserverRootDirective {}
