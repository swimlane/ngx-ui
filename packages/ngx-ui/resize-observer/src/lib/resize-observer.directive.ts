import {
  Attribute,
  Directive,
  ElementRef,
  Inject,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ResizeObserverService } from './services';
import {
  RESIZE_OBSERVER_OBSERVE_BOX,
  RESIZE_OPTION_BOX_DEFAULT,
} from './tokens';

// TODO switch to Attribute once https://github.com/angular/angular/issues/36479 is fixed
export function observeBoxFactory({
  nativeElement,
}: ElementRef<Element>): ResizeObserverOptions['box'] {
  const attribute = nativeElement.getAttribute(
    'ngxResizeObserverBox'
  ) as ResizeObserverOptions['box'];

  return attribute || RESIZE_OPTION_BOX_DEFAULT;
}

@Directive({
  selector: '[ngxResizeObserver]',
  providers: [
    ResizeObserverService,
    {
      provide: RESIZE_OBSERVER_OBSERVE_BOX,
      deps: [ElementRef],
      useFactory: observeBoxFactory,
    },
  ],
})
export class ResizeObserverDirective {
  @Output() ngxResizeObserver!: Observable<ReadonlyArray<ResizeObserverEntry>>;

  constructor(
    @Inject(ResizeObserverService)
    entries$: Observable<ReadonlyArray<ResizeObserverEntry>>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Attribute('ngxResizeObserverBox') observeBox: ResizeObserverOptions['box']
  ) {
    this.ngxResizeObserver = entries$;
  }
}
