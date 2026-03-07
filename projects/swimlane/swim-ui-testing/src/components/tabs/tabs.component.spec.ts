import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/tabs/index.js';

describe('swim-tabs', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-tabs', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-tabs');
  });

  it('reflects vertical and appearance', async () => {
    const el = await fixture<HTMLElement & { vertical: boolean; appearance: string }>('swim-tabs', {
      vertical: true,
      appearance: 'light'
    });
    expect(el.vertical).toBe(true);
    expect(el.appearance).toBe('light');
  });

  it('has slot and css parts', async () => {
    const el = await fixture<HTMLElement>('swim-tabs', {});
    expect(el.shadowRoot?.querySelector('slot')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('[part="tablist"]')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('[part="tab-content"]')).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-tabs', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
