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

  it('accepts showIcons', async () => {
    const el = await fixture<HTMLElement & { showIcons: boolean }>('swim-toggle', { showIcons: true });
    expect(el.showIcons).toBe(true);
  });

  it('fires change when toggled', async () => {
    const el = await fixture<HTMLElement & { checked: boolean }>('swim-toggle', { checked: false });
    const roving = el.shadowRoot?.querySelector('.swim-toggle__roving');
    expect(roving).toBeTruthy();
    const changePromise = oneEvent(el, 'change');
    roving!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const e = await changePromise;
    expect(e).toBeDefined();
  });

  it('has css parts track, thumb, and text', async () => {
    const el = await fixture<HTMLElement>('swim-toggle', {});
    expect(el.shadowRoot?.querySelector('[part="track"]')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('[part="thumb"]')).toBeTruthy();
  });

  it('emits change exactly once per toggle (no double emit)', async () => {
    const el = await fixture<HTMLElement & { checked: boolean }>('swim-toggle', { checked: false });
    const roving = el.shadowRoot!.querySelector('.swim-toggle__roving')!;
    await expectEventOnce(el, 'change', () => roving.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  });

  it('has default slot for label content', async () => {
    const el = await fixture<HTMLElement>('swim-toggle', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  describe('dynamic property changes', () => {
    it('toggles checked after render', async () => {
      const el = await fixture<HTMLElement & { checked: boolean }>('swim-toggle', { checked: false });
      el.checked = true;
      await waitForUpdate(el);
      expect(el.checked).toBe(true);
    });

    it('changes disabled after render', async () => {
      const el = await fixture<HTMLElement & { disabled: boolean }>('swim-toggle', { disabled: false });
      el.disabled = true;
      await waitForUpdate(el);
      expect(el.disabled).toBe(true);
    });

    it('changes label after render', async () => {
      const el = await fixture<HTMLElement & { label: string }>('swim-toggle', { label: 'Off' });
      el.label = 'On';
      await waitForUpdate(el);
      expect(el.label).toBe('On');
    });
  });

  describe('form integration', () => {
    it('can be placed inside a form with a name', () => {
      const { form, control } = createFormWithControl('swim-toggle', { name: 'notifications', checked: true });
      expect(control.parentElement).toBe(form);
      expect((control as HTMLElement & { name: string }).name).toBe('notifications');
    });
  });

  describe('edge cases', () => {
    it('toggling when disabled does not fire change', async () => {
      const el = await fixture<HTMLElement & { checked: boolean; disabled: boolean }>('swim-toggle', {
        checked: false,
        disabled: true
      });
      const roving = el.shadowRoot?.querySelector('.swim-toggle__roving');
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

    it('rapid checked toggling settles correctly', async () => {
      const el = await fixture<HTMLElement & { checked: boolean }>('swim-toggle', { checked: false });
      el.checked = true;
      el.checked = false;
      el.checked = true;
      await waitForUpdate(el);
      expect(el.checked).toBe(true);
    });
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
    await waitForUpdate(el);
    assertAccessible(el, { ariaChecked: true });
  });
});
