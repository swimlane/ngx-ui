import {
  Attribute,
  Directive,
  ElementRef,
  Inject,
  OnDestroy,
  Optional,
} from '@angular/core';
import { noop } from 'rxjs';
import {
  INTERSECTION_OBSERVER_ROOT,
  INTERSECTION_OBSERVER_ROOT_MARGIN_DEFAULT,
  INTERSECTION_OBSERVER_THRESHOLD_DEFAULT,
} from './tokens';

export function rootMarginFactory(rootMargin: string | null): string {
  return rootMargin || INTERSECTION_OBSERVER_ROOT_MARGIN_DEFAULT;
}

export function thresholdFactory(threshold: string | null): number | number[] {
  return threshold
    ? threshold.split(',').map(parseFloat)
    : INTERSECTION_OBSERVER_THRESHOLD_DEFAULT;
}

@Directive({
  selector: '[ngxIntersectionObserver]',
  exportAs: 'ngxIntersectionObserver',
})
export class IntersectionObserverDirective
  extends IntersectionObserver
  implements OnDestroy
{
  private readonly callbacks = new Map<Element, IntersectionObserverCallback>();

  constructor(
    @Attribute('ngxIntersectionObserverRootMargin') rootMargin: string | null,
    @Attribute('ngxIntersectionObserverThreshold') threshold: string | null,
    @Optional()
    @Inject(INTERSECTION_OBSERVER_ROOT)
    root?: ElementRef<Element> | null
  ) {
    super(
      (entries) => {
        this.callbacks.forEach((callback, element) => {
          const filtered = entries.filter(({ target }) => target === element);

          return filtered.length && callback(filtered, this);
        });
      },
      {
        root: root && root.nativeElement,
        rootMargin: rootMarginFactory(rootMargin),
        threshold: thresholdFactory(threshold),
      }
    );
  }

  observe(target: Element, callback: IntersectionObserverCallback = noop) {
    super.observe(target);
    this.callbacks.set(target, callback);
  }

  unobserve(target: Element) {
    super.unobserve(target);
    this.callbacks.delete(target);
  }

  ngOnDestroy() {
    this.disconnect();
  }
}
