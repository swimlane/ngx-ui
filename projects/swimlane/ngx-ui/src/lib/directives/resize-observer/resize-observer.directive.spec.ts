import { ElementRef } from '@angular/core';

import { ResizeObserverDirective } from './resize-observer.directive';

describe('ResizeObserverDirective', () => {
  let directive: ResizeObserverDirective;
  let el: ElementRef<HTMLElement>;

  beforeEach(() => {
    el = { nativeElement: document.createElement('div') };
    directive = new ResizeObserverDirective(el);
  });

  beforeEach(() => {
    directive.ngOnInit();
  });

  afterEach(() => {
    directive.ngOnDestroy();
  });

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });

  it('should throttle resize event', done => {
    const spy = spyOn(directive.resize, 'emit');

    directive.onResize({});
    directive.onResize({});

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 150);
  });
});
