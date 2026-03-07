import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, removeAndFlush, assertNoEventAfterDestroy, waitForUpdate } from '../../test-utils.js';

import '../../../../swim-ui/src/components/drawer/index.js';

describe('swim-drawer', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-drawer', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-drawer');
  });

  it('accepts direction, size, closeOnOutsideClick', async () => {
    const el = await fixture<HTMLElement & { direction: string; size: number; closeOnOutsideClick: boolean }>(
      'swim-drawer',
      { direction: 'left', size: 300, closeOnOutsideClick: false }
    );
    expect(el.direction).toBe('left');
    expect(el.size).toBe(300);
    expect(el.closeOnOutsideClick).toBe(false);
  });

  it('accepts cssClass and zIndex', async () => {
    const el = await fixture<HTMLElement & { cssClass: string; zIndex: number }>('swim-drawer', {
      cssClass: 'custom-drawer',
      zIndex: 999
    });
    expect(el.cssClass).toBe('custom-drawer');
    expect(el.zIndex).toBe(999);
  });

  it('show() and hide() update visibility', async () => {
    const el = await fixture<HTMLElement & { show: () => void; hide: () => void }>('swim-drawer', {});
    el.show();
    await waitForUpdate(el);
    el.hide();
    await waitForUpdate(el);
  });

  it('fires close when hidden', async () => {
    const el = await fixture<HTMLElement & { show: () => void; hide: () => void }>('swim-drawer', {});
    el.show();
    await waitForUpdate(el);
    const closePromise = oneEvent(el, 'close');
    el.hide();
    await closePromise;
  });

  it('has css part content', async () => {
    const el = await fixture<HTMLElement & { show: () => void }>('swim-drawer', {});
    el.show();
    await waitForUpdate(el);
    const content = el.shadowRoot?.querySelector('[part="content"]');
    expect(content).toBeTruthy();
  });

  it('has slot for content when visible', async () => {
    const el = await fixture<HTMLElement & { show: () => void }>('swim-drawer', {});
    el.show();
    await waitForUpdate(el);
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  describe('composition with content', () => {
    it('renders child content through slot', async () => {
      const el = await fixture<HTMLElement & { show: () => void }>('swim-drawer', {});
      const p = document.createElement('p');
      p.textContent = 'Drawer content';
      el.appendChild(p);
      el.show();
      await waitForUpdate(el);
      expect(el.children.length).toBe(1);
      expect(el.children[0].textContent).toBe('Drawer content');
    });
  });

  describe('dynamic property changes', () => {
    it('changes direction after render', async () => {
      const el = await fixture<HTMLElement & { direction: string }>('swim-drawer', { direction: 'left' });
      el.direction = 'right';
      await waitForUpdate(el);
      expect(el.direction).toBe('right');
    });

    it('changes size after render', async () => {
      const el = await fixture<HTMLElement & { size: number }>('swim-drawer', { size: 200 });
      el.size = 400;
      await waitForUpdate(el);
      expect(el.size).toBe(400);
    });
  });

  describe('edge cases', () => {
    it('rapid show/hide does not throw', async () => {
      const el = await fixture<HTMLElement & { show: () => void; hide: () => void }>('swim-drawer', {});
      el.show();
      el.hide();
      el.show();
      el.hide();
      await waitForUpdate(el);
    });

    it('hide() on already-hidden drawer does not throw', async () => {
      const el = await fixture<HTMLElement & { hide: () => void }>('swim-drawer', {});
      expect(() => el.hide()).not.toThrow();
    });
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-drawer', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('cleans up document keydown listener when destroyed: no close event after remove (no leak)', async () => {
    const el = await fixture<HTMLElement & { show: () => void }>('swim-drawer', {});
    el.show();
    await waitForUpdate(el);
    await assertNoEventAfterDestroy(el, 'close', () =>
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    );
  });
});
