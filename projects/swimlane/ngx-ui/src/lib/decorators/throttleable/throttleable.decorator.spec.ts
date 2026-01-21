import { ThrottleableFixture } from './throttleable.fixture';

describe('throttleable', () => {
  let fixture: ThrottleableFixture;

  beforeEach(() => {
    fixture = new ThrottleableFixture();
  });

  it('should call throttleable fn', async () => {
    const spy = vi.spyOn(fixture, 'doSomething');
    fixture.fn();

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
    }, 10);
  });
});
