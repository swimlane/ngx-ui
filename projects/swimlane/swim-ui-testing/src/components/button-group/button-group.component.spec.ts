import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/button-group/index.js';

describe('swim-button-group', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-button-group', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-button-group');
  });

  it('has default slot for buttons', async () => {
    const el = await fixture<HTMLElement>('swim-button-group', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('reflects orientation', async () => {
    const el = await fixture<HTMLElement & { orientation: string }>('swim-button-group', {
      orientation: 'vertical'
    });
    expect(el.getAttribute('orientation')).toBe('vertical');
    expect(el.orientation).toBe('vertical');
  });

  it('reflects variant', async () => {
    const el = await fixture<HTMLElement & { variant: string }>('swim-button-group', { variant: 'text' });
    expect(el.getAttribute('variant')).toBe('text');
    expect(el.variant).toBe('text');
  });

  it('reflects buttonGroupStyle', async () => {
    const el = await fixture<HTMLElement & { buttonGroupStyle: string }>('swim-button-group', {
      buttonGroupStyle: 'primary'
    });
    expect(el.getAttribute('button-group-style')).toBe('primary');
    expect(el.buttonGroupStyle).toBe('primary');
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-button-group', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
