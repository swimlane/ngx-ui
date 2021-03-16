import { DebounceableFixture } from './debounceable.fixture';

describe('debounceable', () => {
  let fixture: DebounceableFixture;

  beforeEach(() => {
    fixture = new DebounceableFixture();
  });

  it('should call debounceable fn', done => {
    const spy = spyOn(fixture, 'doSomething');
    fixture.fn();

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    }, 10);
  });
});
