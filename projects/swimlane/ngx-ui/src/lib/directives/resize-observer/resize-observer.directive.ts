import { Directive, Output, EventEmitter, OnInit, OnDestroy, ElementRef } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';

@Directive({
  exportAs: 'resizeObserver',
  selector: '[resizeObserver]',
  standalone: false
})
export class ResizeObserverDirective implements OnInit, OnDestroy {
  @Output('resizeObserver') resize = new EventEmitter<Partial<DOMRectReadOnly>>();

  private _observer: ResizeObserver;
  private _timer: any;

  constructor(private readonly _el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this._observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.onResize(entry.contentRect);
      }
    });

    this._observer.observe(this._el.nativeElement);
  }

  ngOnDestroy(): void {
    this._observer.unobserve(this._el.nativeElement);
  }

  onResize(e: Partial<DOMRectReadOnly>): void {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = undefined;
    }

    this._timer = setTimeout(() => this.resize.emit(e), 100);
  }
}
