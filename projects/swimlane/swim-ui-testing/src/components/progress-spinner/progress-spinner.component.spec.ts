import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/progress-spinner/index.js';

describe('swim-progress-spinner', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-progress-spinner', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-progress-spinner');
  });

  it('reflects mode', async () => {
    const el = await fixture<HTMLElement & { mode: string }>('swim-progress-spinner', {
      mode: 'determinate'
    });
    expect(el.getAttribute('mode')).toBe('determinate');
    expect(el.mode).toBe('determinate');
  });

  it('accepts value and total for determinate', async () => {
    const el = await fixture<HTMLElement & { value: number; total: number; mode: string }>('swim-progress-spinner', {
      value: 50,
      total: 100,
      mode: 'determinate'
    });
    expect(el.value).toBe(50);
    expect(el.total).toBe(100);
  });

  it('reflects appearance', async () => {
    const el = await fixture<HTMLElement & { appearance: string }>('swim-progress-spinner', {
      appearance: 'icon'
    });
    expect(el.getAttribute('appearance')).toBe('icon');
    expect(el.appearance).toBe('icon');
  });

  it('reflects isFailure', async () => {
    const el = await fixture<HTMLElement & { isFailure: boolean }>('swim-progress-spinner', {
      isFailure: true
    });
    expect(el.hasAttribute('is-failure')).toBe(true);
    expect(el.isFailure).toBe(true);
  });

  it('has part container', async () => {
    const el = await fixture<HTMLElement>('swim-progress-spinner', {});
    const part = el.shadowRoot?.querySelector('[part="container"]');
    expect(part).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-progress-spinner', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
