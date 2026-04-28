import { describe, it, expect } from 'vitest';
import {
  fixture,
  oneEvent,
  expectEventOnce,
  removeAndFlush,
  assertAccessible,
  createFormWithControl,
  waitForUpdate
} from '../../test-utils.js';

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

  it('accepts name for form association', async () => {
    const el = await fixture<HTMLElement & { name: string }>('swim-checkbox', { name: 'agree' });
    expect(el.name).toBe('agree');
  });

  it('accepts round property', async () => {
    const el = await fixture<HTMLElement & { round: boolean }>('swim-checkbox', { round: true });
    expect(el.round).toBe(true);
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

  it('has default slot for label content', async () => {
    const el = await fixture<HTMLElement>('swim-checkbox', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  describe('dynamic property changes', () => {
    it('toggles checked after render', async () => {
      const el = await fixture<HTMLElement & { checked: boolean }>('swim-checkbox', { checked: false });
      el.checked = true;
      await waitForUpdate(el);
      expect(el.checked).toBe(true);
    });

    it('changes disabled after render', async () => {
      const el = await fixture<HTMLElement & { disabled: boolean }>('swim-checkbox', { disabled: false });
      el.disabled = true;
      await waitForUpdate(el);
      expect(el.disabled).toBe(true);
    });

    it('changes indeterminate after render', async () => {
      const el = await fixture<HTMLElement & { indeterminate: boolean }>('swim-checkbox', { indeterminate: false });
      el.indeterminate = true;
      await waitForUpdate(el);
      expect(el.indeterminate).toBe(true);
    });
  });

  describe('form integration', () => {
    it('can be placed inside a form with a name', () => {
      const { form, control } = createFormWithControl('swim-checkbox', { name: 'terms', checked: true });
      expect(control.parentElement).toBe(form);
      expect((control as HTMLElement & { name: string }).name).toBe('terms');
    });
  });

  describe('edge cases', () => {
    it('clicking when disabled does not toggle', async () => {
      const el = await fixture<HTMLElement & { checked: boolean; disabled: boolean }>('swim-checkbox', {
        checked: false,
        disabled: true
      });
      const roving = el.shadowRoot?.querySelector('.swim-checkbox__roving');
      let fired = false;
      el.addEventListener('checked-change', () => {
        fired = true;
      });
      if (roving) {
        roving.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
      await new Promise(r => setTimeout(r, 30));
      expect(fired).toBe(false);
      expect(el.checked).toBe(false);
    });

    it('rapid checked toggling settles correctly', async () => {
      const el = await fixture<HTMLElement & { checked: boolean }>('swim-checkbox', { checked: false });
      el.checked = true;
      el.checked = false;
      el.checked = true;
      await waitForUpdate(el);
      expect(el.checked).toBe(true);
    });
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
    await waitForUpdate(el);
    assertAccessible(el, { ariaChecked: true });
  });
});
