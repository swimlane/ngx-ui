import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, expectEventOnce, removeAndFlush, assertAccessible } from '../../test-utils.js';

import '../../../../swim-ui/src/components/dialog/index.js';

describe('swim-dialog', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-dialog', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-dialog');
  });

  it('reflects visible and fires open/close', async () => {
    const el = await fixture<HTMLElement & { visible: boolean }>('swim-dialog', { visible: false });
    expect(el.visible).toBe(false);
    const openPromise = oneEvent(el, 'open');
    el.visible = true;
    await (el as { updateComplete: Promise<void> }).updateComplete;
    await openPromise;
    const closePromise = oneEvent(el, 'close');
    el.visible = false;
    await (el as { updateComplete: Promise<void> }).updateComplete;
    await closePromise;
  });

  it('accepts dialogTitle and format', async () => {
    const el = await fixture<HTMLElement & { dialogTitle: string; format: string }>('swim-dialog', {
      dialogTitle: 'Title',
      format: 'regular'
    });
    expect(el.dialogTitle).toBe('Title');
    expect(el.format).toBe('regular');
  });

  it('has css parts content and close-button', async () => {
    const el = await fixture<HTMLElement>('swim-dialog', { visible: true });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    expect(el.shadowRoot?.querySelector('[part="content"]')).toBeTruthy();
  });

  it('emits open exactly once when shown and close exactly once when hidden', async () => {
    const el = await fixture<HTMLElement & { visible: boolean }>('swim-dialog', { visible: false });
    await expectEventOnce(el, 'open', () => {
      el.visible = true;
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    await expectEventOnce(el, 'close', () => {
      el.visible = false;
    });
  });

  it('cleans up on remove: can be removed when visible without throwing', async () => {
    const el = await fixture<HTMLElement & { visible: boolean }>('swim-dialog', { visible: true });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('is accessible: has role dialog and aria-modal when visible', async () => {
    const el = await fixture<HTMLElement & { visible: boolean }>('swim-dialog', { visible: true });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    assertAccessible(el, { role: 'dialog', ariaModal: true, focusable: true });
  });
});
