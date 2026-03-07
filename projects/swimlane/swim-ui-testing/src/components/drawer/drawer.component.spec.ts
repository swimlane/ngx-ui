import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, removeAndFlush, assertNoEventAfterDestroy } from '../../test-utils.js';

import '../../../../swim-ui/src/components/drawer/index.js';

describe('swim-drawer', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-drawer', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-drawer');
  });

  it('accepts direction, size, closeOnOutsideClick', async () => {
    const el = await fixture<HTMLElement & { direction: string; size: number; closeOnOutsideClick: boolean }>(
      'swim-drawer',
      { direction: 'left', size: 300, closeOnOutsideClick: false }
    );
    expect(el.direction).toBe('left');
    expect(el.size).toBe(300);
    expect(el.closeOnOutsideClick).toBe(false);
  });

  it('show() and hide() update visibility', async () => {
    const el = await fixture<HTMLElement & { show: () => void; hide: () => void }>('swim-drawer', {});
    el.show();
    await (el as { updateComplete: Promise<void> }).updateComplete;
    el.hide();
    await (el as { updateComplete: Promise<void> }).updateComplete;
  });

  it('fires close when hidden', async () => {
    const el = await fixture<HTMLElement & { show: () => void; hide: () => void }>('swim-drawer', {});
    el.show();
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const closePromise = oneEvent(el, 'close');
    el.hide();
    await closePromise;
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-drawer', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('cleans up document keydown listener when destroyed: no close event after remove (no leak)', async () => {
    const el = await fixture<HTMLElement & { show: () => void }>('swim-drawer', {});
    el.show();
    await (el as { updateComplete: Promise<void> }).updateComplete;
    await assertNoEventAfterDestroy(el, 'close', () =>
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    );
  });
});
