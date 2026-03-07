import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush, assertAccessible } from '../../test-utils.js';

import '../../../../swim-ui/src/components/select/index.js';

describe('swim-select', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-select', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-select');
  });

  it('accepts label, placeholder, hint', async () => {
    const el = await fixture<HTMLElement & { label: string; placeholder: string; hint: string }>('swim-select', {
      label: 'Choose',
      placeholder: 'Select...',
      hint: 'Pick one'
    });
    expect(el.label).toBe('Choose');
    expect(el.placeholder).toBe('Select...');
    expect(el.hint).toBe('Pick one');
  });

  it('accepts options array', async () => {
    const el = await fixture<HTMLElement & { options: { name: string; value: string }[] }>('swim-select', {
      options: [
        { name: 'A', value: 'a' },
        { name: 'B', value: 'b' }
      ]
    });
    expect(el.options).toHaveLength(2);
    expect(el.options[0].name).toBe('A');
    expect(el.options[0].value).toBe('a');
  });

  it('accepts and reflects value', async () => {
    const el = await fixture<HTMLElement & { value: string; options: { name: string; value: string }[] }>(
      'swim-select',
      {
        value: 'b',
        options: [
          { name: 'A', value: 'a' },
          { name: 'B', value: 'b' }
        ]
      }
    );
    expect(el.value).toBe('b');
  });

  it('reflects disabled', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-select', { disabled: true });
    expect(el.disabled).toBe(true);
  });

  it('has css part select (dropdown part exists when open)', async () => {
    const el = await fixture<HTMLElement>('swim-select', {});
    expect(el.shadowRoot?.querySelector('[part="select"]')).toBeTruthy();
    // dropdown is only in DOM when _open is true; part="select" is always present
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-select', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('is accessible: has combobox role and focusable trigger', async () => {
    const el = await fixture<HTMLElement>('swim-select', { label: 'Choose' });
    assertAccessible(el, { role: 'combobox', focusable: true });
  });
});
