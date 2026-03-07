import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, expectEventOnce, removeAndFlush, assertAccessible } from '../../test-utils.js';

import '../../../../swim-ui/src/components/toggle/index.js';

describe('swim-toggle', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-toggle', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-toggle');
  });

  it('reflects checked', async () => {
    const el = await fixture<HTMLElement & { checked: boolean }>('swim-toggle', { checked: true });
    expect(el.checked).toBe(true);
    expect(el.getAttribute('checked')).toBeDefined();
  });

  it('reflects disabled and required', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean; required: boolean }>('swim-toggle', {
      disabled: true,
      required: true
    });
    expect(el.disabled).toBe(true);
    expect(el.required).toBe(true);
  });

  it('accepts name for form submission', async () => {
    const el = await fixture<HTMLElement & { name: string }>('swim-toggle', { name: 'agree' });
    expect(el.name).toBe('agree');
  });

  it('accepts label', async () => {
    const el = await fixture<HTMLElement & { label: string }>('swim-toggle', { label: 'Enable' });
    expect(el.label).toBe('Enable');
  });

  it('fires change when toggled', async () => {
    const el = await fixture<HTMLElement & { checked: boolean }>('swim-toggle', { checked: false });
    const roving = el.shadowRoot?.querySelector('.swim-toggle__roving');
    expect(roving).toBeTruthy();
    const changePromise = oneEvent(el, 'change');
    roving!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const e = await changePromise;
    expect(e).toBeDefined();
    expect((e as CustomEvent & { detail?: { target?: { checked?: boolean } } }).detail?.target?.checked).toBe(true);
  });

  it('has css parts track and thumb', async () => {
    const el = await fixture<HTMLElement>('swim-toggle', {});
    expect(el.shadowRoot?.querySelector('[part="track"]')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('[part="thumb"]')).toBeTruthy();
  });

  it('emits change exactly once per toggle (no double emit)', async () => {
    const el = await fixture<HTMLElement & { checked: boolean }>('swim-toggle', { checked: false });
    const roving = el.shadowRoot!.querySelector('.swim-toggle__roving')!;
    await expectEventOnce(el, 'change', () => roving.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-toggle', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('is accessible: has role switch and aria-checked', async () => {
    const el = await fixture<HTMLElement & { checked: boolean }>('swim-toggle', { checked: false });
    assertAccessible(el, { role: 'switch', ariaChecked: false, focusable: true });
    el.checked = true;
    await (el as { updateComplete: Promise<void> }).updateComplete;
    assertAccessible(el, { ariaChecked: true });
  });
});
