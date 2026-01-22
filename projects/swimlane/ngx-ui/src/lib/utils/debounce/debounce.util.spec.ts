import type { Mock } from 'vitest';
/* eslint-disable no-console */
import { debounce } from './debounce.util';

describe('debounce', () => {
  let spy: Mock;

  beforeEach(() => {
    spy = vi.spyOn(window.console, 'log').mockImplementation(() => undefined);
  });

  it('should get debounce result', () => {
    debounce(() => console.log('test'), 0, true)();
    expect(spy).toHaveBeenCalled();
  });

  it('should get debounce result with wait', async () => {
    const dbc = debounce(() => console.log('test'), 10);
    dbc();

    setTimeout(() => {
      dbc();
      expect(spy).not.toHaveBeenCalled();
    }, 5);
  });
});
