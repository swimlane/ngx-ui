import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/button-toggle/index.js';

describe('swim-button-toggle-group', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-button-toggle-group', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-button-toggle-group');
  });

  it('accepts value', async () => {
    const el = await fixture<HTMLElement & { value: string }>('swim-button-toggle-group', {
      value: 'a'
    });
    expect(el.value).toBe('a');
  });

  it('has slot for toggles', async () => {
    const el = await fixture<HTMLElement>('swim-button-toggle-group', {});
    expect(el.shadowRoot?.querySelector('slot')).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-button-toggle-group', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
