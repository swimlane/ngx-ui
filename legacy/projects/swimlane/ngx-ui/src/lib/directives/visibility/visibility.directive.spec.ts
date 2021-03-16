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
    const spy = spyOn(directive, 'runCheck');
    directive.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should clear timeout on destroy', () => {
    const spy = spyOn(window, 'clearTimeout');
    directive.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should set visible', done => {
    const spy = spyOn(directive.visible, 'emit');
    directive.onVisibilityChange();
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  describe('runCheck', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(directive, 'onVisibilityChange');
    });

    it('should check if visible and be false', done => {
      directive.runCheck();

      setTimeout(() => {
        expect(spy).not.toHaveBeenCalled();
        done();
      });
    });

    it('should check if visible and be true', done => {
      elementRef.nativeElement.offsetHeight = 10;
      elementRef.nativeElement.offsetWidth = 10;
      directive.runCheck();

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      });
    });
  });
});
