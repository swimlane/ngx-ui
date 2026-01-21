import { DebounceableFixture } from './debounceable.fixture';

describe('debounceable', () => {
  let fixture: DebounceableFixture;

  beforeEach(() => {
    fixture = new DebounceableFixture();
  });

  it('should call debounceable fn', async () => {
    const spy = vi.spyOn(fixture, 'doSomething');
    fixture.fn();

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
    }, 10);
  });
});
