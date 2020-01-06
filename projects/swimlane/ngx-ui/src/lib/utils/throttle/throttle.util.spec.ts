import { throttle } from './throttle.util';

describe('throttle', () => {
  let spy: jasmine.Spy;

  beforeEach(() => {
    spy = spyOn(window.console, 'log').and.callFake(() => undefined);
  });

  it('should get throttle result', (done) => {
    throttle(() => console.log('test'), 0)();

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it('should throttle multiple calls', (done) => {
    const fn = throttle(() => console.log('test'), 10, { leading: false });
    fn();

    setTimeout(() => {
      expect(spy).not.toHaveBeenCalled();
      fn();

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      }, 10);
    });
  });

  it('should throttle multiple calls with leading call', (done) => {
    const fn = throttle(() => console.log('test'), 10);
    fn();

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      fn();

      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(2);
        done();
      }, 10);
    });
  });
});
