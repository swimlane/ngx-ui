import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, removeAndFlush, assertNoEventAfterDestroy, waitForUpdate } from '../../test-utils.js';

import '../../../../swim-ui/src/components/tooltip/index.js';

describe('swim-tooltip', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-tooltip', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-tooltip');
  });

  it('accepts content property', async () => {
    const el = await fixture<HTMLElement & { content: string }>('swim-tooltip', { content: 'Help text' });
    expect(el.content).toBe('Help text');
  });

  it('accepts placement property', async () => {
    const el = await fixture<HTMLElement & { placement: string }>('swim-tooltip', { placement: 'top' });
    expect(el.placement).toBe('top');
  });

  it('accepts type property', async () => {
    const el = await fixture<HTMLElement & { type: string }>('swim-tooltip', { type: 'popover' });
    expect(el.type).toBe('popover');
  });

  it('reflects disabled', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-tooltip', { disabled: true });
    expect(el.disabled).toBe(true);
  });

  it('accepts showCaret', async () => {
    const el = await fixture<HTMLElement & { showCaret: boolean }>('swim-tooltip', { showCaret: true });
    expect(el.showCaret).toBe(true);
  });

  it('accepts spacing', async () => {
    const el = await fixture<HTMLElement & { spacing: number }>('swim-tooltip', { spacing: 10 });
    expect(el.spacing).toBe(10);
  });

  it('has slot for trigger content', async () => {
    const el = await fixture<HTMLElement>('swim-tooltip', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('has css parts', async () => {
    const el = await fixture<HTMLElement & { content: string; show: (imm?: boolean) => void }>('swim-tooltip', {
      content: 'Tip'
    });
    await waitForUpdate(el);
    const trigger = el.shadowRoot?.querySelector('[part="trigger"]');
    expect(trigger).toBeTruthy();
  });

  it('show() and hide() methods work', async () => {
    const el = await fixture<
      HTMLElement & { content: string; show: (imm?: boolean) => void; hide: (imm?: boolean) => void }
    >('swim-tooltip', { content: 'Tip' });
    await waitForUpdate(el);

    const showPromise = oneEvent(el, 'show');
    el.show(true);
    await showPromise;

    const hidePromise = oneEvent(el, 'hide');
    el.hide(true);
    await hidePromise;
  });

  describe('dynamic property changes', () => {
    it('changes content after render', async () => {
      const el = await fixture<HTMLElement & { content: string }>('swim-tooltip', { content: 'Old' });
      el.content = 'New';
      await waitForUpdate(el);
      expect(el.content).toBe('New');
    });

    it('changes placement after render', async () => {
      const el = await fixture<HTMLElement & { placement: string }>('swim-tooltip', { placement: 'top' });
      el.placement = 'bottom';
      await waitForUpdate(el);
      expect(el.placement).toBe('bottom');
    });

    it('changes disabled after render', async () => {
      const el = await fixture<HTMLElement & { disabled: boolean }>('swim-tooltip', { disabled: false });
      el.disabled = true;
      await waitForUpdate(el);
      expect(el.disabled).toBe(true);
    });
  });

  describe('composition with trigger', () => {
    it('renders trigger content through slot', async () => {
      const el = await fixture<HTMLElement & { content: string }>('swim-tooltip', { content: 'Tip' });
      const btn = document.createElement('button');
      btn.textContent = 'Hover me';
      el.appendChild(btn);
      await waitForUpdate(el);
      expect(el.children.length).toBe(1);
      expect(el.children[0].textContent).toBe('Hover me');
    });
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-tooltip', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('cleans up window/document listeners when destroyed: no hide event after remove (no leak)', async () => {
    const el = await fixture<HTMLElement & { content: string; show: (immediate?: boolean) => void }>('swim-tooltip', {
      content: 'Tip'
    });
    await waitForUpdate(el);
    el.show(true);
    await waitForUpdate(el);
    await assertNoEventAfterDestroy(el, 'hide', () => window.dispatchEvent(new Event('resize')));
  });
});
