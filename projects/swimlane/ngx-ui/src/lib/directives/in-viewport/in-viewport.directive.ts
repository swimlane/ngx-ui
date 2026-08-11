import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Output,
  PLATFORM_ID
} from '@angular/core';

import { InViewportActionEvent, InViewportOptions } from './in-viewport.types';

/**
 * CSP-safe viewport observer (native IntersectionObserver).
 * Replaces the former `ng-in-viewport` peer dependency.
 */
@Directive({
  selector: '[inViewport]',
  exportAs: 'inViewport',
  standalone: false
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  @Output() readonly inViewportAction = new EventEmitter<InViewportActionEvent>();

  private optionsConfig: InViewportOptions = { partial: true, threshold: [0, 1] };
  private observer?: IntersectionObserver;

  @Input('inViewportOptions')
  set options(value: InViewportOptions | undefined) {
    this.optionsConfig = {
      partial: true,
      threshold: [0, 1],
      ...value
    };
  }

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    protected readonly elementRef: ElementRef<HTMLElement>,
    private readonly ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      this.emit(undefined, true);
      return;
    }

    const root = this.optionsConfig.root ?? null;
    const rootMargin = this.optionsConfig.rootMargin ?? '0px';
    const threshold = this.optionsConfig.threshold ?? [0, 1];

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        entries => {
          const entry = entries.find(e => e.target === this.elementRef.nativeElement);
          if (!entry) {
            return;
          }
          this.ngZone.run(() => this.emit(entry, false));
        },
        { root, rootMargin, threshold }
      );
      this.observer.observe(this.elementRef.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = undefined;
  }

  private isVisible(entry: IntersectionObserverEntry | undefined, force: boolean): boolean {
    if (force || !entry) {
      return true;
    }
    const partiallyVisible = entry.isIntersecting || entry.intersectionRatio > 0;
    const completelyVisible = entry.intersectionRatio >= 1;
    return this.optionsConfig.partial !== false ? partiallyVisible : completelyVisible;
  }

  private emit(entry: IntersectionObserverEntry | undefined, force: boolean): void {
    this.inViewportAction.emit({
      visible: this.isVisible(entry, force),
      target: this.elementRef.nativeElement,
      entry
    });
  }
}
