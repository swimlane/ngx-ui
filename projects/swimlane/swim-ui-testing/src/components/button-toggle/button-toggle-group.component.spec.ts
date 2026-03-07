import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, removeAndFlush, flush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/button-toggle/index.js';

async function createToggleGroup(values: string[], opts: { selected?: string; disabled?: boolean } = {}) {
  const el = await fixture<HTMLElement & { value: string; disabled: boolean }>('swim-button-toggle-group', {
    value: opts.selected ?? '',
    disabled: opts.disabled ?? false
  });

  for (const v of values) {
    const toggle = document.createElement('swim-button-toggle') as HTMLElement & { value: string };
    toggle.value = v;
    toggle.textContent = v.toUpperCase();
    el.appendChild(toggle);
  }

  await (el as { updateComplete: Promise<void> }).updateComplete;
  await flush();
  await new Promise(r => setTimeout(r, 20));
  return el;
}

describe('swim-button-toggle-group', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-button-toggle-group', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-button-toggle-group');
  });

  it('accepts value', async () => {
    const el = await fixture<HTMLElement & { value: string }>('swim-button-toggle-group', { value: 'a' });
    expect(el.value).toBe('a');
  });

  it('accepts label', async () => {
    const el = await fixture<HTMLElement & { label: string }>('swim-button-toggle-group', { label: 'Options' });
    expect(el.label).toBe('Options');
  });

  it('reflects disabled', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-button-toggle-group', { disabled: true });
    expect(el.disabled).toBe(true);
  });

  it('has slot for toggles', async () => {
    const el = await fixture<HTMLElement>('swim-button-toggle-group', {});
    expect(el.shadowRoot?.querySelector('slot')).toBeTruthy();
  });

  describe('composition with swim-button-toggle', () => {
    it('renders toggle children via slot', async () => {
      const el = await createToggleGroup(['a', 'b', 'c']);
      expect(el.children.length).toBe(3);
      for (const child of Array.from(el.children)) {
        expect(child.tagName.toLowerCase()).toBe('swim-button-toggle');
      }
    });

    it('dynamically changes value', async () => {
      const el = await createToggleGroup(['a', 'b', 'c'], { selected: 'a' });
      expect((el as HTMLElement & { value: string }).value).toBe('a');
      (el as HTMLElement & { value: string }).value = 'b';
      await (el as { updateComplete: Promise<void> }).updateComplete;
      expect((el as HTMLElement & { value: string }).value).toBe('b');
    });
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-button-toggle-group', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});

describe('swim-button-toggle', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-button-toggle', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-button-toggle');
  });

  it('accepts value', async () => {
    const el = await fixture<HTMLElement & { value: string }>('swim-button-toggle', { value: 'x' });
    expect(el.value).toBe('x');
  });

  it('reflects checked', async () => {
    const el = await fixture<HTMLElement & { checked: boolean }>('swim-button-toggle', { checked: true });
    expect(el.checked).toBe(true);
  });

  it('reflects disabled', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-button-toggle', { disabled: true });
    expect(el.disabled).toBe(true);
  });

  it('has default slot for label', async () => {
    const el = await fixture<HTMLElement>('swim-button-toggle', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-button-toggle', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
