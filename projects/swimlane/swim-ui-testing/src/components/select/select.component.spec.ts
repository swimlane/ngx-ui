import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush, assertAccessible, createFormWithControl, waitForUpdate } from '../../test-utils.js';

const sampleOptions = [
  { name: 'A', value: 'a' },
  { name: 'B', value: 'b' }
];

async function openDropdown(el: HTMLElement) {
  const trigger = el.shadowRoot?.querySelector('[part="select"]') as HTMLElement;
  trigger.click();
  await waitForUpdate(el);
}

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

  it('reflects required', async () => {
    const el = await fixture<HTMLElement & { required: boolean }>('swim-select', { required: true });
    expect(el.required).toBe(true);
  });

  it('accepts name for form submission', async () => {
    const el = await fixture<HTMLElement & { name: string }>('swim-select', { name: 'country' });
    expect(el.name).toBe('country');
  });

  it('accepts size property', async () => {
    const el = await fixture<HTMLElement & { size: string }>('swim-select', { size: 'sm' });
    expect(el.size).toBe('sm');
  });

  it('accepts appearance property', async () => {
    const el = await fixture<HTMLElement & { appearance: string }>('swim-select', { appearance: 'fill' });
    expect(el.appearance).toBe('fill');
  });

  it('accepts filterable property', async () => {
    const el = await fixture<HTMLElement & { filterable: boolean }>('swim-select', { filterable: true });
    expect(el.filterable).toBe(true);
  });

  it('defaults filterIcon to search', async () => {
    const el = await fixture<HTMLElement & { filterIcon: string }>('swim-select', {});
    expect(el.filterIcon).toBe('search');
  });

  it('accepts filterIcon property', async () => {
    const el = await fixture<HTMLElement & { filterIcon: string }>('swim-select', { filterIcon: 'globe' });
    expect(el.filterIcon).toBe('globe');
  });

  it('accepts multiple property', async () => {
    const el = await fixture<HTMLElement & { multiple: boolean }>('swim-select', { multiple: true });
    expect(el.multiple).toBe(true);
  });

  it('accepts allowClear property', async () => {
    const el = await fixture<HTMLElement & { allowClear: boolean }>('swim-select', { allowClear: true });
    expect(el.allowClear).toBe(true);
  });

  it('has css part select', async () => {
    const el = await fixture<HTMLElement>('swim-select', {});
    expect(el.shadowRoot?.querySelector('[part="select"]')).toBeTruthy();
  });

  describe('filter field', () => {
    it('shows the default search icon when opened', async () => {
      const el = await fixture<HTMLElement & { options: { name: string; value: string }[] }>('swim-select', {
        options: sampleOptions
      });
      await openDropdown(el);
      const icon = el.shadowRoot?.querySelector('.select-filter-icon') as HTMLElement & { fontIcon: string };
      expect(icon).toBeTruthy();
      expect(icon.fontIcon).toBe('search');
    });

    it('renders a custom filter-icon name', async () => {
      const el = await fixture<HTMLElement & { filterIcon: string; options: { name: string; value: string }[] }>(
        'swim-select',
        { filterIcon: 'globe', options: sampleOptions }
      );
      await openDropdown(el);
      const icon = el.shadowRoot?.querySelector('.select-filter-icon') as HTMLElement & { fontIcon: string };
      expect(icon.fontIcon).toBe('globe');
    });

    it('hides the filter icon when filterIcon is empty', async () => {
      const el = await fixture<HTMLElement & { filterIcon: string; options: { name: string; value: string }[] }>(
        'swim-select',
        { filterIcon: '', options: sampleOptions }
      );
      await openDropdown(el);
      expect(el.shadowRoot?.querySelector('.select-filter-icon')).toBeFalsy();
      expect(el.shadowRoot?.querySelector('.select-filter--has-icon')).toBeFalsy();
    });

    it('shows a clear button after typing in the filter and clears on click', async () => {
      const el = await fixture<HTMLElement & { options: { name: string; value: string }[] }>('swim-select', {
        options: sampleOptions
      });
      await openDropdown(el);
      const input = el.shadowRoot?.querySelector('.select-filter-input') as HTMLInputElement;
      expect(el.shadowRoot?.querySelector('.select-filter-clear')).toBeFalsy();

      input.value = 'A';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await waitForUpdate(el);

      const clear = el.shadowRoot?.querySelector('.select-filter-clear') as HTMLButtonElement;
      expect(clear).toBeTruthy();
      clear.click();
      await waitForUpdate(el);

      const after = el.shadowRoot?.querySelector('.select-filter-input') as HTMLInputElement;
      expect(after.value).toBe('');
      expect(el.shadowRoot?.querySelector('.select-filter-clear')).toBeFalsy();
    });
  });

  describe('empty state slot', () => {
    async function selectWithEmptySlot(props: Record<string, unknown> = {}) {
      const el = document.createElement('swim-select') as HTMLElement & Record<string, unknown>;
      for (const [key, value] of Object.entries(props)) {
        el[key] = value;
      }
      const custom = document.createElement('div');
      custom.slot = 'empty';
      custom.textContent = 'No tools available';
      el.appendChild(custom);
      document.body.appendChild(el);
      await waitForUpdate(el);
      return el;
    }

    it('renders string empty-placeholder when no slot is provided', async () => {
      const el = await fixture<HTMLElement & { options: unknown[]; emptyPlaceholder: string }>('swim-select', {
        options: [],
        emptyPlaceholder: 'No options available'
      });
      await openDropdown(el);
      const empty = el.shadowRoot?.querySelector('.select-empty');
      expect(empty?.textContent).toContain('No options available');
      expect(el.shadowRoot?.querySelector('slot[name="empty"]')).toBeFalsy();
    });

    it('renders slot="empty" instead of the string placeholder', async () => {
      const el = await selectWithEmptySlot({ options: [] });
      await openDropdown(el);

      expect(el.shadowRoot?.querySelector('slot[name="empty"]')).toBeTruthy();
      expect(el.shadowRoot?.querySelector('.select-empty--custom')).toBeTruthy();
      expect(el.shadowRoot?.querySelector('[part="empty"]')).toBeTruthy();
    });

    it('keeps the searching placeholder while loading even with an empty slot', async () => {
      const el = await selectWithEmptySlot({
        options: [],
        loading: true,
        filterSearchingPlaceholder: 'Searching…'
      });
      await openDropdown(el);

      expect(el.shadowRoot?.querySelector('slot[name="empty"]')).toBeFalsy();
      expect(el.shadowRoot?.querySelector('.select-empty')?.textContent).toContain('Searching');
    });
  });

  describe('dynamic property changes', () => {
    it('changes value after render', async () => {
      const el = await fixture<HTMLElement & { value: string; options: { name: string; value: string }[] }>(
        'swim-select',
        {
          value: 'a',
          options: [
            { name: 'A', value: 'a' },
            { name: 'B', value: 'b' }
          ]
        }
      );
      el.value = 'b';
      await waitForUpdate(el);
      expect(el.value).toBe('b');
    });

    it('changes disabled after render', async () => {
      const el = await fixture<HTMLElement & { disabled: boolean }>('swim-select', { disabled: false });
      el.disabled = true;
      await waitForUpdate(el);
      expect(el.disabled).toBe(true);
    });

    it('changes options after render', async () => {
      const el = await fixture<HTMLElement & { options: { name: string; value: string }[] }>('swim-select', {
        options: [{ name: 'A', value: 'a' }]
      });
      el.options = [
        { name: 'X', value: 'x' },
        { name: 'Y', value: 'y' }
      ];
      await waitForUpdate(el);
      expect(el.options).toHaveLength(2);
      expect(el.options[0].value).toBe('x');
    });
  });

  describe('form integration', () => {
    it('can be placed inside a form with a name', () => {
      const { form, control } = createFormWithControl('swim-select', { name: 'role', value: 'admin' });
      expect(control.parentElement).toBe(form);
      expect((control as HTMLElement & { name: string }).name).toBe('role');
    });
  });

  describe('edge cases', () => {
    it('handles empty options array', async () => {
      const el = await fixture<HTMLElement & { options: { name: string; value: string }[] }>('swim-select', {
        options: []
      });
      expect(el.options).toHaveLength(0);
    });

    it('handles value not in options', async () => {
      const el = await fixture<HTMLElement & { value: string; options: { name: string; value: string }[] }>(
        'swim-select',
        { value: 'nonexistent', options: [{ name: 'A', value: 'a' }] }
      );
      expect(el.value).toBe('nonexistent');
    });
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
