import type { MockInstance } from 'vitest';
import { NgZone } from '@angular/core';

import { VisibilityDirective } from './visibility.directive';

describe('VisibilityDirective', () => {
  let directive: VisibilityDirective;
  let elementRef: any;

  beforeEach(() => {
    elementRef = {
      nativeElement: {
        offsetHeight: 0,
        offsetWidth: 0
      }
    };

    directive = new VisibilityDirective(elementRef, new NgZone({}));
  });

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });

  it('should call on init', () => {
    const spy = vi.spyOn(directive, 'runCheck');
    directive.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should clear timeout on destroy', () => {
    const spy = vi.spyOn(window, 'clearTimeout');
    directive.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should set visible', async () => {
    const spy = vi.spyOn(directive.visible, 'emit');
    directive.onVisibilityChange();
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('runCheck', () => {
    let spy: MockInstance<any>;

    beforeEach(() => {
      spy = vi.spyOn(directive, 'onVisibilityChange');
    });

    it('should check if visible and be false', async () => {
      directive.runCheck();

      setTimeout(() => {
        expect(spy).not.toHaveBeenCalled();
      });
    });

    it('should check if visible and be true', async () => {
      elementRef.nativeElement.offsetHeight = 10;
      elementRef.nativeElement.offsetWidth = 10;
      directive.runCheck();

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
