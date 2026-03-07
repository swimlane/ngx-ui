import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/navbar/index.js';

describe('swim-navbar', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-navbar', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-navbar');
  });

  it('accepts active index', async () => {
    const el = await fixture<HTMLElement & { active: number }>('swim-navbar', {
      active: 1
    });
    expect(el.active).toBe(1);
  });

  it('has slot for items', async () => {
    const el = await fixture<HTMLElement>('swim-navbar', {});
    expect(el.shadowRoot?.querySelector('slot')).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-navbar', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
