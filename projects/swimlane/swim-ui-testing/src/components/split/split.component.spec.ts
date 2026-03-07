import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/split/index.js';

describe('swim-split', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-split', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-split');
  });

  it('has slot for split areas', async () => {
    const el = await fixture<HTMLElement>('swim-split', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-split', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
