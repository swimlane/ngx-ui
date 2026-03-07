import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush, assertAccessible } from '../../test-utils.js';

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

  it('has default slot when no fontIcon', async () => {
    const el = await fixture<HTMLElement>('swim-icon', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  describe('dynamic property changes', () => {
    it('changes fontIcon after render', async () => {
      const el = await fixture<HTMLElement & { fontIcon: string }>('swim-icon', { fontIcon: 'check' });
      el.fontIcon = 'close';
      await (el as { updateComplete: Promise<void> }).updateComplete;
      expect(el.fontIcon).toBe('close');
    });

    it('changes alt after render', async () => {
      const el = await fixture<HTMLElement & { alt: string }>('swim-icon', { alt: 'Old' });
      el.alt = 'New';
      await (el as { updateComplete: Promise<void> }).updateComplete;
      expect(el.alt).toBe('New');
    });

    it('changes fontSet after render', async () => {
      const el = await fixture<HTMLElement & { fontSet: string }>('swim-icon', { fontSet: 'lit' });
      el.fontSet = 'material';
      await (el as { updateComplete: Promise<void> }).updateComplete;
      expect(el.fontSet).toBe('material');
    });
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

  it('is decorative (role=presentation, aria-hidden) when alt is not set', async () => {
    const el = await fixture<HTMLElement>('swim-icon', { fontIcon: 'star' });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const presentationEl = el.shadowRoot?.querySelector('[role="presentation"]');
    expect(presentationEl).toBeTruthy();
    const hiddenEl = el.shadowRoot?.querySelector('[aria-hidden="true"]');
    expect(hiddenEl).toBeTruthy();
  });
});
