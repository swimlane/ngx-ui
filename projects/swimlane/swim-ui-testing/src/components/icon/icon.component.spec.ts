import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush, assertAccessible } from '../../test-utils.js';

// Register the component (relative to avoid package resolution winning over alias)
import '../../../../swim-ui/src/components/icon/index.js';

describe('swim-icon', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-icon', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-icon');
  });

  it('accepts and reflects fontIcon property', async () => {
    const el = await fixture<HTMLElement & { fontIcon: string }>('swim-icon', { fontIcon: 'check' });
    expect(el.fontIcon).toBe('check');
  });

  it('accepts and reflects fontSet property', async () => {
    const el = await fixture<HTMLElement & { fontSet: string }>('swim-icon', { fontSet: 'lit' });
    expect(el.fontSet).toBe('lit');
  });

  it('reflects alt for accessibility', async () => {
    const el = await fixture<HTMLElement & { alt: string }>('swim-icon', { alt: 'Close' });
    expect(el.alt).toBe('Close');
  });

  it('accepts iconClass property', async () => {
    const el = await fixture<HTMLElement & { iconClass: string }>('swim-icon', { iconClass: 'my-icon' });
    expect(el.iconClass).toBe('my-icon');
  });

  it('has part="icon" for styling', async () => {
    const el = await fixture<HTMLElement>('swim-icon', { fontIcon: 'check' });
    const part = el.shadowRoot?.querySelector('[part="icon"]');
    expect(part).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-icon', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('is accessible: when alt is set, has role img and aria-label', async () => {
    const el = await fixture<HTMLElement & { alt: string }>('swim-icon', { alt: 'Close' });
    assertAccessible(el, { role: 'img', ariaLabel: 'Close' });
  });
});
