import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { default as ResizeObserver } from 'resize-observer-polyfill';
import { Subscription, timer } from 'rxjs';

@Directive({
  exportAs: 'resizeObserver',
  selector: '[resizeObserver]',
})
export class ResizeObserverDirective implements OnInit, OnDestroy {
  @Output('resizeObserver') resize = new EventEmitter<
    Partial<DOMRectReadOnly>
  >();

  private _observer!: ResizeObserver;
  private subscription?: Subscription;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this._observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.onResize(entry.contentRect);
      }
    });

    this._observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this._observer.unobserve(this.el.nativeElement);
  }

  onResize(e: Partial<DOMRectReadOnly>) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = timer(100).subscribe(() => {
      this.resize.emit(e);
    });
  }
}
