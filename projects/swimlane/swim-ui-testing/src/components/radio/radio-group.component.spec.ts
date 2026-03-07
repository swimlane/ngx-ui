import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/radio/index.js';

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
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-radio-group', {
      disabled: true
    });
    expect(el.disabled).toBe(true);
  });

  it('has slot for radio children', async () => {
    const el = await fixture<HTMLElement>('swim-radio-group', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-radio-group', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
