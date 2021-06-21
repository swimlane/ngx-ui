import {
  Attribute,
  Directive,
  ElementRef,
  Inject,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IntersectionObserverService } from './services';
import {
  INTERSECTION_OBSERVER_ROOT_MARGIN,
  INTERSECTION_OBSERVER_ROOT_MARGIN_DEFAULT,
  INTERSECTION_OBSERVER_THRESHOLD,
  INTERSECTION_OBSERVER_THRESHOLD_DEFAULT,
} from './tokens';

export function intersectionObserverOptionsFactory(
  attributeName:
    | 'ngxIntersectionObserverRootMargin'
    | 'ngxIntersectionObserverThreshold',
  defaultValue: string | (number | number[])
) {
  return ({ nativeElement }: ElementRef<Element>) => {
    const attribute = nativeElement.getAttribute(attributeName) as string;

    return attribute || defaultValue;
  };
}

@Directive({
  selector: '[ngxIntersect]',
  exportAs: 'ngxIntersect',
  providers: [
    IntersectionObserverService,
    {
      provide: INTERSECTION_OBSERVER_ROOT_MARGIN,
      deps: [ElementRef],
      useFactory: intersectionObserverOptionsFactory(
        'ngxIntersectionObserverRootMargin',
        INTERSECTION_OBSERVER_ROOT_MARGIN_DEFAULT
      ),
    },
    {
      provide: INTERSECTION_OBSERVER_THRESHOLD,
      deps: [ElementRef],
      useFactory: intersectionObserverOptionsFactory(
        'ngxIntersectionObserverThreshold',
        INTERSECTION_OBSERVER_THRESHOLD_DEFAULT
      ),
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
