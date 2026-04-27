import type { Mock } from 'vitest';
/* eslint-disable no-console */
import { debounce } from './debounce.util';

describe('debounce', () => {
  let spy: Mock;

  beforeEach(() => {
    spy = vi.spyOn(window.console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should get debounce result', () => {
    debounce(() => console.log('test'), 0, true)();
    expect(spy).toHaveBeenCalled();
  });

  it('should get debounce result with wait', async () => {
    const dbc = debounce(() => console.log('test'), 10);
    dbc();
    expect(spy).not.toHaveBeenCalled();

    await new Promise<void>(resolve => {
      setTimeout(resolve, 11);
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
