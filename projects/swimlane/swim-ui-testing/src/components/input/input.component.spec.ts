import { describe, it, expect } from 'vitest';
import {
  fixture,
  oneEvent,
  expectEventOnce,
  removeAndFlush,
  assertAccessible,
  createFormWithControl
} from '../../test-utils.js';

import '../../../../swim-ui/src/components/input/index.js';

describe('swim-input', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-input', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-input');
  });

  it('accepts and reflects value', async () => {
    const el = await fixture<HTMLElement & { value: string }>('swim-input', { value: 'hello' });
    expect(el.value).toBe('hello');
  });

  it('accepts label, placeholder, hint', async () => {
    const el = await fixture<HTMLElement & { label: string; placeholder: string; hint: string }>('swim-input', {
      label: 'Name',
      placeholder: 'Enter name',
      hint: 'Required'
    });
    expect(el.label).toBe('Name');
    expect(el.placeholder).toBe('Enter name');
    expect(el.hint).toBe('Required');
  });

  it('reflects disabled, readonly, required', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean; readonly: boolean; required: boolean }>('swim-input', {
      disabled: true,
      readonly: true,
      required: true
    });
    expect(el.disabled).toBe(true);
    expect(el.readonly).toBe(true);
    expect(el.required).toBe(true);
  });

  it('accepts name for form submission', async () => {
    const el = await fixture<HTMLElement & { name: string }>('swim-input', { name: 'email' });
    expect(el.name).toBe('email');
  });

  it('accepts type property', async () => {
    const el = await fixture<HTMLElement & { type: string }>('swim-input', { type: 'password' });
    expect(el.type).toBe('password');
  });

  it('accepts size property', async () => {
    const el = await fixture<HTMLElement & { size: string }>('swim-input', { size: 'sm' });
    expect(el.size).toBe('sm');
  });

  it('accepts appearance property', async () => {
    const el = await fixture<HTMLElement & { appearance: string }>('swim-input', { appearance: 'fill' });
    expect(el.appearance).toBe('fill');
  });

  it('accepts autocomplete', async () => {
    const el = await fixture<HTMLElement & { autocomplete: string }>('swim-input', { autocomplete: 'email' });
    expect(el.autocomplete).toBe('email');
  });

  it('accepts min, max, minlength, maxlength', async () => {
    const el = await fixture<HTMLElement & { min: number; max: number; minlength: number; maxlength: number }>(
      'swim-input',
      { min: 0, max: 100, minlength: 2, maxlength: 50 }
    );
    expect(Number(el.min)).toBe(0);
    expect(Number(el.max)).toBe(100);
    expect(Number(el.minlength)).toBe(2);
    expect(Number(el.maxlength)).toBe(50);
  });

  it('fires change when value changes', async () => {
    const el = await fixture<HTMLElement & { value: string }>('swim-input', { value: '' });
    const input = el.shadowRoot?.querySelector('input, textarea') as HTMLInputElement;
    expect(input).toBeTruthy();
    const changePromise = oneEvent(el, 'change');
    input.value = 'new';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await changePromise;
  });

  it('has css parts input and label', async () => {
    const el = await fixture<HTMLElement>('swim-input', { label: 'Test' });
    expect(el.shadowRoot?.querySelector('[part="input"]')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('[part="label"]')).toBeTruthy();
  });

  it('emits change exactly once when value is committed (no double emit)', async () => {
    const el = await fixture<HTMLElement & { value: string }>('swim-input', { value: '' });
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'x';
    await expectEventOnce(el, 'change', () => input.dispatchEvent(new Event('change', { bubbles: true })));
  });

  describe('dynamic property changes', () => {
    it('changes value after render', async () => {
      const el = await fixture<HTMLElement & { value: string }>('swim-input', { value: 'old' });
      el.value = 'new';
      await (el as { updateComplete: Promise<void> }).updateComplete;
      expect(el.value).toBe('new');
    });

    it('changes disabled after render', async () => {
      const el = await fixture<HTMLElement & { disabled: boolean }>('swim-input', { disabled: false });
      el.disabled = true;
      await (el as { updateComplete: Promise<void> }).updateComplete;
      expect(el.disabled).toBe(true);
    });

    it('changes label after render', async () => {
      const el = await fixture<HTMLElement & { label: string }>('swim-input', { label: 'Old' });
      el.label = 'New';
      await (el as { updateComplete: Promise<void> }).updateComplete;
      expect(el.label).toBe('New');
    });

    it('changes placeholder after render', async () => {
      const el = await fixture<HTMLElement & { placeholder: string }>('swim-input', { placeholder: 'Before' });
      el.placeholder = 'After';
      await (el as { updateComplete: Promise<void> }).updateComplete;
      expect(el.placeholder).toBe('After');
    });
  });

  describe('form integration', () => {
    it('can be placed inside a form with a name', () => {
      const { form, control } = createFormWithControl('swim-input', { name: 'username', value: 'alice' });
      expect(control.parentElement).toBe(form);
      expect((control as HTMLElement & { name: string }).name).toBe('username');
    });
  });

  describe('edge cases', () => {
    it('handles empty string value', async () => {
      const el = await fixture<HTMLElement & { value: string }>('swim-input', { value: '' });
      expect(el.value).toBe('');
    });

    it('passwordToggleEnabled for password type', async () => {
      const el = await fixture<HTMLElement & { type: string; passwordToggleEnabled: boolean }>('swim-input', {
        type: 'password',
        passwordToggleEnabled: true
      });
      expect(el.passwordToggleEnabled).toBe(true);
    });
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-input', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('is accessible: has focusable input and label', async () => {
    const el = await fixture<HTMLElement>('swim-input', { label: 'Email' });
    assertAccessible(el, { focusable: true });
    const label = el.shadowRoot?.querySelector('[part="label"]');
    expect(label?.textContent?.trim()).toBe('Email');
  });
});
