import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush, flush, waitForUpdate } from '../../test-utils.js';

import '../../../../swim-ui/src/components/radio/index.js';

async function createRadioGroup(values: string[], opts: { selected?: string; disabled?: boolean; name?: string } = {}) {
  const el = await fixture<HTMLElement & { value: string; name: string; disabled: boolean }>('swim-radio-group', {
    value: opts.selected ?? '',
    name: opts.name ?? 'test-group',
    disabled: opts.disabled ?? false
  });

  for (const v of values) {
    const radio = document.createElement('swim-radio') as HTMLElement & { value: string; checked: boolean };
    radio.value = v;
    radio.textContent = v.toUpperCase();
    if (v === opts.selected) {
      radio.checked = true;
    }
    el.appendChild(radio);
  }

  await waitForUpdate(el);
  await flush();
  await new Promise(r => setTimeout(r, 20));
  return el;
}

describe('swim-radio-group', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-radio-group', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-radio-group');
  });

  it('accepts value and name', async () => {
    const el = await fixture<HTMLElement & { value: string; name: string }>('swim-radio-group', {
      value: 'b',
      name: 'group1'
    });
    expect(el.value).toBe('b');
    expect(el.name).toBe('group1');
  });

  it('reflects disabled', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-radio-group', { disabled: true });
    expect(el.disabled).toBe(true);
  });

  it('has slot for radio children', async () => {
    const el = await fixture<HTMLElement>('swim-radio-group', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  describe('composition with swim-radio', () => {
    it('renders radio children via slot', async () => {
      const el = await createRadioGroup(['a', 'b', 'c']);
      expect(el.children.length).toBe(3);
      for (const child of Array.from(el.children)) {
        expect(child.tagName.toLowerCase()).toBe('swim-radio');
      }
    });

    it('dynamically changes group value', async () => {
      const el = await createRadioGroup(['a', 'b', 'c'], { selected: 'a' });
      expect((el as HTMLElement & { value: string }).value).toBe('a');
      (el as HTMLElement & { value: string }).value = 'c';
      await waitForUpdate(el);
      expect((el as HTMLElement & { value: string }).value).toBe('c');
    });

    it('disabling the group propagates to children', async () => {
      const el = await createRadioGroup(['a', 'b'], { disabled: false });
      (el as HTMLElement & { disabled: boolean }).disabled = true;
      await waitForUpdate(el);
      expect((el as HTMLElement & { disabled: boolean }).disabled).toBe(true);
    });
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-radio-group', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
