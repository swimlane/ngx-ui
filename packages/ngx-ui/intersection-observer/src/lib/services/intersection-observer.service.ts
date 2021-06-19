import {
  ElementRef,
  Inject,
  Injectable,
  NgZone,
  Optional,
} from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import {
  INTERSECTION_OBSERVER_ROOT,
  INTERSECTION_OBSERVER_ROOT_MARGIN,
  INTERSECTION_OBSERVER_SUPPORT,
  INTERSECTION_OBSERVER_THRESHOLD,
} from '../tokens';

@Injectable()
export class IntersectionObserverService extends Observable<
  ReadonlyArray<IntersectionObserverEntry>
> {
  constructor(
    @Inject(ElementRef) { nativeElement }: ElementRef<Element>,
    @Inject(NgZone) ngZone: NgZone,
    @Inject(INTERSECTION_OBSERVER_SUPPORT) isSupport: boolean,
    @Inject(INTERSECTION_OBSERVER_ROOT_MARGIN) rootMargin: string,
    @Inject(INTERSECTION_OBSERVER_THRESHOLD) threshold: number | number[],
    @Optional()
    @Inject(INTERSECTION_OBSERVER_ROOT)
    root?: ElementRef<Element> | null
  ) {
    let observer: IntersectionObserver;
    super((subscriber) => {
      if (!isSupport) {
        subscriber.error(
          'IntersectionObserver is not supported in your browser'
        );
        return;
      }

      ngZone.runOutsideAngular(() => {
        observer = new IntersectionObserver(
          (entries) => {
            ngZone.run(() => subscriber.next(entries));
          },
          {
            root: root && root.nativeElement,
            rootMargin,
            threshold,
          }
        );

        observer.observe(nativeElement);
      });

      return () => {
        observer?.disconnect();
      };
    });

    // TODO: update to use new share() API w/ RxJS 7
    return this.pipe(share());
  }
}
