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

  it('should get debounce result with wait', () => {
    vi.useFakeTimers();
    try {
      const dbc = debounce(() => console.log('test'), 10);
      dbc();
      expect(spy).not.toHaveBeenCalled();

      vi.advanceTimersByTime(10);
      expect(spy).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });
});
