import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush, assertNoEventAfterDestroy } from '../../test-utils.js';

import '../../../../swim-ui/src/components/tooltip/index.js';

describe('swim-tooltip', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-tooltip', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-tooltip');
  });

  it('has slot for content', async () => {
    const el = await fixture<HTMLElement>('swim-tooltip', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-tooltip', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('cleans up window/document listeners when destroyed: no hide event after remove (no leak)', async () => {
    const el = await fixture<HTMLElement & { content: string; show: (immediate?: boolean) => void }>('swim-tooltip', {
      content: 'Tip'
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    el.show(true);
    await (el as { updateComplete: Promise<void> }).updateComplete;
    await assertNoEventAfterDestroy(el, 'hide', () => window.dispatchEvent(new Event('resize')));
  });
});
