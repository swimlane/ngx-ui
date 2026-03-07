import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, expectEventOnce, removeAndFlush, assertAccessible } from '../../test-utils.js';

import '../../../../swim-ui/src/components/radio/index.js';

describe('swim-radio', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-radio', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-radio');
  });

  it('reflects checked and value', async () => {
    const el = await fixture<HTMLElement & { checked: boolean; value: string }>('swim-radio', {
      checked: true,
      value: 'yes'
    });
    expect(el.checked).toBe(true);
    expect(el.value).toBe('yes');
  });

  it('reflects disabled', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-radio', { disabled: true });
    expect(el.disabled).toBe(true);
  });

  it('accepts name', async () => {
    const el = await fixture<HTMLElement & { name: string }>('swim-radio', { name: 'choice' });
    expect(el.name).toBe('choice');
  });

  it('fires change when clicked', async () => {
    const el = await fixture<HTMLElement & { checked: boolean; value: string }>('swim-radio', {
      checked: false,
      value: 'x'
    });
    const roving = el.shadowRoot?.querySelector('.swim-radio__roving');
    expect(roving).toBeTruthy();
    const changePromise = oneEvent(el, 'change');
    roving!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const e = await changePromise;
    expect(e).toBeDefined();
  });

  it('has css parts checkmark and content', async () => {
    const el = await fixture<HTMLElement>('swim-radio', {});
    expect(el.shadowRoot?.querySelector('[part="checkmark"]')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('[part="content"]')).toBeTruthy();
  });

  it('emits change exactly once per click (no double emit)', async () => {
    const el = await fixture<HTMLElement & { checked: boolean; value: string }>('swim-radio', {
      checked: false,
      value: 'x'
    });
    const roving = el.shadowRoot!.querySelector('.swim-radio__roving')!;
    await expectEventOnce(el, 'change', () => roving.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-radio', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('is accessible: has role radio and aria-checked', async () => {
    const el = await fixture<HTMLElement & { checked: boolean }>('swim-radio', { checked: false });
    assertAccessible(el, { role: 'radio', ariaChecked: false, focusable: true });
  });
});
