import { throttle } from './throttle.util';
import { fakeAsync, tick } from '@angular/core/testing';

describe('throttle', () => {
  let spy: any;

  beforeEach(() => {
    spy = vi.fn();
  });

  it('should get throttle result', fakeAsync(() => {
    throttle(spy, 0)();
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('should throttle multiple calls', fakeAsync(() => {
    const fn = throttle(spy, 10, { leading: false });
    fn();
    tick();
    expect(spy).not.toHaveBeenCalled();
    fn();
    tick(10);
    expect(spy).toHaveBeenCalled();
  }));

  it('should throttle multiple calls with leading call', fakeAsync(() => {
    const fn = throttle(spy, 10);
    fn();
    tick();
    expect(spy).toHaveBeenCalledTimes(1);
    fn();
    tick(15);
    expect(spy).toHaveBeenCalledTimes(2);
  }));
});
