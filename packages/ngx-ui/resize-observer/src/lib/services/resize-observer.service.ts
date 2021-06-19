import { ElementRef, Inject, Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import {
  RESIZE_OBSERVER_OBSERVE_BOX,
  RESIZE_OBSERVER_SUPPORT,
} from '../tokens';

@Injectable()
export class ResizeObserverService extends Observable<
  ReadonlyArray<ResizeObserverEntry>
> {
  constructor(
    @Inject(ElementRef) { nativeElement }: ElementRef<Element>,
    @Inject(NgZone) ngZone: NgZone,
    @Inject(RESIZE_OBSERVER_SUPPORT) isSupport: boolean,
    @Inject(RESIZE_OBSERVER_OBSERVE_BOX)
    observeBox: ResizeObserverOptions['box']
  ) {
    let observer: ResizeObserver;

    super((subscriber) => {
      if (!isSupport) {
        subscriber.error('ResizeObserver is not supported in your browser');
        return;
      }

      observer = new ResizeObserver((entries) => {
        ngZone.run(() => subscriber.next(entries));
      });

      observer.observe(nativeElement, { box: observeBox });

      return () => {
        observer.disconnect();
      };
    });

    // TODO: update to use new share() API w/ RxJS 7
    return this.pipe(share());
  }
}
