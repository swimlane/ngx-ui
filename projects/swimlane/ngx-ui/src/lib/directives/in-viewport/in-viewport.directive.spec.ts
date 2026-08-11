import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InViewportModule } from './in-viewport.module';
import { InViewportActionEvent } from './in-viewport.types';
import { stubIntersectionObserverIfNeeded } from '../../testing/stub-intersection-observer';

@Component({
  template: `<div inViewport [inViewportOptions]="options" (inViewportAction)="onAction($event)"></div>`,
  standalone: false
})
class HostComponent {
  options = { partial: false as boolean };
  lastEvent?: InViewportActionEvent;

  onAction(event: InViewportActionEvent): void {
    this.lastEvent = event;
  }
}

describe('InViewportDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let observeSpy: ReturnType<typeof vi.fn>;
  let disconnectSpy: ReturnType<typeof vi.fn>;
  let observerCallback: IntersectionObserverCallback;

  beforeAll(() => {
    stubIntersectionObserverIfNeeded();
  });

  beforeEach(async () => {
    observeSpy = vi.fn();
    disconnectSpy = vi.fn();

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin = '';
      readonly thresholds: ReadonlyArray<number> = [];

      constructor(cb: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
        observerCallback = cb;
      }

      observe = observeSpy;
      unobserve = vi.fn();
      disconnect = disconnectSpy;
      takeRecords = () => [];
    }

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [InViewportModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('observes the host element', () => {
    expect(observeSpy).toHaveBeenCalled();
  });

  it('emits visible false when partial is false and ratio is below 1', () => {
    const target = fixture.nativeElement.querySelector('div') as HTMLElement;
    observerCallback(
      [
        {
          target,
          isIntersecting: true,
          intersectionRatio: 0.5,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: 0
        } as IntersectionObserverEntry
      ],
      {} as IntersectionObserver
    );

    expect(host.lastEvent?.visible).toBe(false);
    expect(host.lastEvent?.target).toBe(target);
    expect(host.lastEvent?.entry?.intersectionRatio).toBe(0.5);
  });

  it('emits visible true when fully intersecting', () => {
    const target = fixture.nativeElement.querySelector('div') as HTMLElement;
    observerCallback(
      [
        {
          target,
          isIntersecting: true,
          intersectionRatio: 1,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: 0
        } as IntersectionObserverEntry
      ],
      {} as IntersectionObserver
    );

    expect(host.lastEvent?.visible).toBe(true);
  });

  it('disconnects on destroy', () => {
    fixture.destroy();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
