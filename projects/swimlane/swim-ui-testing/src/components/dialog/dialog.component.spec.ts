import { describe, it, expect } from 'vitest';
import {
  fixture,
  oneEvent,
  expectEventOnce,
  removeAndFlush,
  assertAccessible,
  waitForUpdate
} from '../../test-utils.js';

import '../../../../swim-ui/src/components/dialog/index.js';

describe('swim-dialog', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-dialog', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-dialog');
  });

  it('reflects visible and fires open/close', async () => {
    const el = await fixture<HTMLElement & { visible: boolean }>('swim-dialog', { visible: false });
    expect(el.visible).toBe(false);
    const openPromise = oneEvent(el, 'open');
    el.visible = true;
    await waitForUpdate(el);
    await openPromise;
    const closePromise = oneEvent(el, 'close');
    el.visible = false;
    await waitForUpdate(el);
    await closePromise;
  });

  it('accepts dialogTitle and format', async () => {
    const el = await fixture<HTMLElement & { dialogTitle: string; format: string }>('swim-dialog', {
      dialogTitle: 'Title',
      format: 'regular'
    });
    expect(el.dialogTitle).toBe('Title');
    expect(el.format).toBe('regular');
  });

  it('accepts closeButton property', async () => {
    const el = await fixture<HTMLElement & { closeButton: boolean }>('swim-dialog', { closeButton: true });
    expect(el.closeButton).toBe(true);
  });

  it('accepts showBackdrop property', async () => {
    const el = await fixture<HTMLElement & { showBackdrop: boolean }>('swim-dialog', { showBackdrop: true });
    expect(el.showBackdrop).toBe(true);
  });

  it('has css parts content and close-button', async () => {
    const el = await fixture<HTMLElement>('swim-dialog', { visible: true });
    await waitForUpdate(el);
    expect(el.shadowRoot?.querySelector('[part="content"]')).toBeTruthy();
  });

  it('has default slot for body content', async () => {
    const el = await fixture<HTMLElement>('swim-dialog', { visible: true });
    await waitForUpdate(el);
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('show() and hide() methods control visibility', async () => {
    const el = await fixture<HTMLElement & { visible: boolean; show: () => void; hide: () => void }>('swim-dialog', {
      visible: false
    });
    const openPromise = oneEvent(el, 'open');
    el.show();
    await waitForUpdate(el);
    await openPromise;
    expect(el.visible).toBe(true);

    const closePromise = oneEvent(el, 'close');
    el.hide();
    await waitForUpdate(el);
    await closePromise;
    expect(el.visible).toBe(false);
  });

  it('emits open exactly once when shown and close exactly once when hidden', async () => {
    const el = await fixture<HTMLElement & { visible: boolean }>('swim-dialog', { visible: false });
    await expectEventOnce(el, 'open', () => {
      el.visible = true;
    });
    await waitForUpdate(el);
    await expectEventOnce(el, 'close', () => {
      el.visible = false;
    });
  });

  describe('dynamic property changes', () => {
    it('changes dialogTitle after render', async () => {
      const el = await fixture<HTMLElement & { dialogTitle: string }>('swim-dialog', { dialogTitle: 'Old' });
      el.dialogTitle = 'New';
      await waitForUpdate(el);
      expect(el.dialogTitle).toBe('New');
    });

    it('changes format after render', async () => {
      const el = await fixture<HTMLElement & { format: string }>('swim-dialog', { format: 'regular' });
      el.format = 'large';
      await waitForUpdate(el);
      expect(el.format).toBe('large');
    });
  });

  describe('composition with content', () => {
    it('renders child content through slot', async () => {
      const el = await fixture<HTMLElement & { visible: boolean }>('swim-dialog', { visible: true });
      const p = document.createElement('p');
      p.textContent = 'Dialog body text';
      el.appendChild(p);
      await waitForUpdate(el);
      expect(el.children.length).toBe(1);
      expect(el.children[0].textContent).toBe('Dialog body text');
    });
  });

  describe('edge cases', () => {
    it('rapid open/close does not throw', async () => {
      const el = await fixture<HTMLElement & { visible: boolean }>('swim-dialog', { visible: false });
      el.visible = true;
      el.visible = false;
      el.visible = true;
      el.visible = false;
      await waitForUpdate(el);
      expect(el.visible).toBe(false);
    });
  });

  it('cleans up on remove: can be removed when visible without throwing', async () => {
    const el = await fixture<HTMLElement & { visible: boolean }>('swim-dialog', { visible: true });
    await waitForUpdate(el);
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('is accessible: has role dialog and aria-modal when visible', async () => {
    const el = await fixture<HTMLElement & { visible: boolean }>('swim-dialog', { visible: true });
    await waitForUpdate(el);
    assertAccessible(el, { role: 'dialog', ariaModal: true, focusable: true });
  });
});
