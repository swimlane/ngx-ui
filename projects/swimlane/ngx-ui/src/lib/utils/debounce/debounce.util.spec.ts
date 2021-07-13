/* eslint-disable no-console */
import { debounce } from './debounce.util';

describe('debounce', () => {
  let spy: jasmine.Spy;

  beforeEach(() => {
    spy = spyOn(window.console, 'log').and.callFake(() => undefined);
  });

  it('should get debounce result', () => {
    debounce(() => console.log('test'), 0, true)();
    expect(spy).toHaveBeenCalled();
  });

  it('should get debounce result with wait', done => {
    const dbc = debounce(() => console.log('test'), 10);
    dbc();

    setTimeout(() => {
      dbc();
      expect(spy).not.toHaveBeenCalled();
      done();
    }, 5);
  });
});
