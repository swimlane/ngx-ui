import { describe, it, expect } from 'vitest';
import {
  fixture,
  oneEvent,
  expectEventOnce,
  removeAndFlush,
  assertAccessible,
  waitForUpdate
} from '../../test-utils.js';

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

  it('has default slot for label content', async () => {
    const el = await fixture<HTMLElement>('swim-radio', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('emits change exactly once per click (no double emit)', async () => {
    const el = await fixture<HTMLElement & { checked: boolean; value: string }>('swim-radio', {
      checked: false,
      value: 'x'
    });
    const roving = el.shadowRoot!.querySelector('.swim-radio__roving')!;
    await expectEventOnce(el, 'change', () => roving.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  });

  describe('dynamic property changes', () => {
    it('changes checked after render', async () => {
      const el = await fixture<HTMLElement & { checked: boolean }>('swim-radio', { checked: false });
      el.checked = true;
      await waitForUpdate(el);
      expect(el.checked).toBe(true);
    });

    it('changes value after render', async () => {
      const el = await fixture<HTMLElement & { value: string }>('swim-radio', { value: 'a' });
      el.value = 'b';
      await waitForUpdate(el);
      expect(el.value).toBe('b');
    });

    it('changes disabled after render', async () => {
      const el = await fixture<HTMLElement & { disabled: boolean }>('swim-radio', { disabled: false });
      el.disabled = true;
      await waitForUpdate(el);
      expect(el.disabled).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('clicking when disabled does not fire change', async () => {
      const el = await fixture<HTMLElement & { checked: boolean; disabled: boolean; value: string }>('swim-radio', {
        checked: false,
        disabled: true,
        value: 'x'
      });
      const roving = el.shadowRoot?.querySelector('.swim-radio__roving');
      let fired = false;
      el.addEventListener('change', () => {
        fired = true;
      });
      if (roving) {
        roving.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
      await new Promise(r => setTimeout(r, 30));
      expect(fired).toBe(false);
    });
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
