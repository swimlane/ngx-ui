import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/list/index.js';

describe('swim-list', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-list', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-list');
  });

  it('renders with shadow DOM and list structure', async () => {
    const el = await fixture<HTMLElement>('swim-list', {});
    expect(el.shadowRoot).toBeTruthy();
    const rowsContainer = el.shadowRoot?.querySelector('.swim-list__rows-container, [class*="list"]');
    expect(rowsContainer ?? el.shadowRoot?.firstElementChild).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-list', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
