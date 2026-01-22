import { ThrottleableFixture } from './throttleable.fixture';

describe('throttleable', () => {
  let fixture: ThrottleableFixture;

  beforeEach(() => {
    fixture = new ThrottleableFixture();
  });

  it('should call throttleable fn', done => {
    const spy = spyOn(fixture, 'doSomething');
    fixture.fn();

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    }, 10);
  });
});
