import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, expectEventOnce, removeAndFlush, assertAccessible } from '../../test-utils.js';

import '../../../../swim-ui/src/components/checkbox/index.js';

describe('swim-checkbox', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-checkbox', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-checkbox');
  });

  it('reflects checked', async () => {
    const el = await fixture<HTMLElement & { checked: boolean }>('swim-checkbox', { checked: true });
    expect(el.checked).toBe(true);
  });

  it('reflects indeterminate', async () => {
    const el = await fixture<HTMLElement & { indeterminate: boolean }>('swim-checkbox', {
      indeterminate: true
    });
    expect(el.indeterminate).toBe(true);
  });

  it('reflects disabled', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-checkbox', { disabled: true });
    expect(el.disabled).toBe(true);
  });

  it('fires change when clicked', async () => {
    const el = await fixture<HTMLElement & { checked: boolean }>('swim-checkbox', { checked: false });
    const roving = el.shadowRoot?.querySelector('.swim-checkbox__roving');
    expect(roving).toBeTruthy();
    const changePromise = oneEvent(el, 'change');
    roving!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await changePromise;
  });

  it('fires checked-change with detail', async () => {
    const el = await fixture<HTMLElement & { checked: boolean }>('swim-checkbox', { checked: false });
    const roving = el.shadowRoot?.querySelector('.swim-checkbox__roving');
    const changePromise = oneEvent(el, 'checked-change');
    roving!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const e = await changePromise;
    expect((e as CustomEvent).detail).toBe(true);
  });

  it('has css parts box and content', async () => {
    const el = await fixture<HTMLElement>('swim-checkbox', {});
    expect(el.shadowRoot?.querySelector('[part="box"]')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('[part="content"]')).toBeTruthy();
  });

  it('emits checked-change exactly once per click (no double emit)', async () => {
    const el = await fixture<HTMLElement & { checked: boolean }>('swim-checkbox', { checked: false });
    const roving = el.shadowRoot!.querySelector('.swim-checkbox__roving')!;
    await expectEventOnce(el, 'checked-change', () => roving.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-checkbox', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('is accessible: has role checkbox and aria-checked', async () => {
    const el = await fixture<HTMLElement & { checked: boolean }>('swim-checkbox', { checked: false });
    assertAccessible(el, { role: 'checkbox', ariaChecked: false, focusable: true });
    el.checked = true;
    await (el as { updateComplete: Promise<void> }).updateComplete;
    assertAccessible(el, { ariaChecked: true });
  });
});
