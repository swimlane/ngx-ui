import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/card/index.js';

describe('swim-card', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-card', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-card');
  });

  it('reflects orientation, disabled, selectable, selected', async () => {
    const el = await fixture<
      HTMLElement & { orientation: string; disabled: boolean; selectable: boolean; selected: boolean }
    >('swim-card', { orientation: 'vertical', disabled: true, selectable: true, selected: true });
    expect(el.orientation).toBe('vertical');
    expect(el.disabled).toBe(true);
    expect(el.selectable).toBe(true);
    expect(el.selected).toBe(true);
  });

  it('accepts outlineText and status', async () => {
    const el = await fixture<HTMLElement & { outlineText: string; status: string }>('swim-card', {
      outlineText: 'Label',
      status: 'success'
    });
    expect(el.outlineText).toBe('Label');
    expect(el.status).toBe('success');
  });

  it('has default slot', async () => {
    const el = await fixture<HTMLElement>('swim-card', {});
    expect(el.shadowRoot?.querySelector('slot')).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-card', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
