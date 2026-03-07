import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, expectEventOnce, removeAndFlush, assertAccessible } from '../../test-utils.js';

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
