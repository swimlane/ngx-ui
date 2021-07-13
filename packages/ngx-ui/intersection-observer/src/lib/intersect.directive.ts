import {
  Attribute,
  Directive,
  ElementRef,
  Inject,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IntersectionObserverService } from './intersection-observer.service';
import {
  INTERSECTION_OBSERVER_ROOT_MARGIN,
  INTERSECTION_OBSERVER_ROOT_MARGIN_DEFAULT,
  INTERSECTION_OBSERVER_THRESHOLD,
  INTERSECTION_OBSERVER_THRESHOLD_DEFAULT,
} from './tokens';

export function intersectionRootMarginFactory(elementRef: ElementRef<Element>) {
  const attribute = elementRef.nativeElement.getAttribute(
    'ngxIntersectionObserverRootMargin'
  ) as string;

  return attribute || INTERSECTION_OBSERVER_ROOT_MARGIN_DEFAULT;
}

export function intersectionThresholdFactory(elementRef: ElementRef<Element>) {
  const attribute = elementRef.nativeElement.getAttribute(
    'ngxIntersectionObserverThreshold'
  ) as string;

  return attribute || INTERSECTION_OBSERVER_THRESHOLD_DEFAULT;
}

@Directive({
  selector: '[ngxIntersect]',
  exportAs: 'ngxIntersect',
  providers: [
    IntersectionObserverService,
    {
      provide: INTERSECTION_OBSERVER_ROOT_MARGIN,
      deps: [ElementRef],
      useFactory: intersectionRootMarginFactory,
    },
    {
      provide: INTERSECTION_OBSERVER_THRESHOLD,
      deps: [ElementRef],
      useFactory: intersectionThresholdFactory,
    },
  ],
})
export class IntersectDirective {
  @Output() ngxIntersect: Observable<ReadonlyArray<IntersectionObserverEntry>>;

  constructor(
    @Inject(IntersectionObserverService)
    entries$: Observable<ReadonlyArray<IntersectionObserverEntry>>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Attribute('ngxIntersectionObserverRootMargin') rootMargin: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Attribute('ngxIntersectionObserverThreshold') threshold: string
  ) {
    this.ngxIntersect = entries$;
  }
}
