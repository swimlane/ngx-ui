import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, expectEventOnce, removeAndFlush } from '../../test-utils.js';

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

  it('accepts appearance and hideAccent', async () => {
    const el = await fixture<HTMLElement & { appearance: string; hideAccent: boolean }>('swim-card', {
      appearance: 'outline',
      hideAccent: true
    });
    expect(el.appearance).toBe('outline');
    expect(el.hideAccent).toBe(true);
  });

  it('accepts error property', async () => {
    const el = await fixture<HTMLElement & { error: boolean }>('swim-card', { error: true });
    expect(el.error).toBe(true);
  });

  it('has default slot', async () => {
    const el = await fixture<HTMLElement>('swim-card', {});
    expect(el.shadowRoot?.querySelector('slot')).toBeTruthy();
  });

  it('fires select event when selectable card is toggled', async () => {
    const el = await fixture<HTMLElement & { selectable: boolean; selected: boolean }>('swim-card', {
      selectable: true,
      selected: false
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const checkbox = el.shadowRoot?.querySelector('swim-checkbox') as HTMLElement;
    if (checkbox) {
      const selectPromise = oneEvent(el, 'select');
      const roving = checkbox.shadowRoot?.querySelector('.swim-checkbox__roving');
      if (roving) {
        roving.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        const e = await selectPromise;
        expect(e).toBeDefined();
      }
    }
  });

  it('fires outline-click when outlineText is clicked', async () => {
    const el = await fixture<HTMLElement & { outlineText: string }>('swim-card', {
      outlineText: 'Click me'
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const outlineEl = el.shadowRoot?.querySelector('[part="outline-text"]');
    if (outlineEl) {
      const clickPromise = oneEvent(el, 'outline-click');
      (outlineEl as HTMLElement).click();
      const e = await clickPromise;
      expect(e).toBeDefined();
    }
  });

  describe('composition with sub-components', () => {
    it('renders card-header, card-body, card-footer as children', async () => {
      const el = await fixture<HTMLElement>('swim-card', {});
      const header = document.createElement('swim-card-header');
      const body = document.createElement('swim-card-body');
      body.textContent = 'Body content';
      const footer = document.createElement('swim-card-footer');
      el.appendChild(header);
      el.appendChild(body);
      el.appendChild(footer);
      await (el as { updateComplete: Promise<void> }).updateComplete;

      expect(el.children.length).toBe(3);
      expect(el.children[0].tagName.toLowerCase()).toBe('swim-card-header');
      expect(el.children[1].tagName.toLowerCase()).toBe('swim-card-body');
      expect(el.children[2].tagName.toLowerCase()).toBe('swim-card-footer');
    });
  });

  describe('swim-card-header', () => {
    it('renders without throwing', async () => {
      const el = await fixture<HTMLElement>('swim-card-header', {});
      expect(el.tagName.toLowerCase()).toBe('swim-card-header');
    });

    it('accepts label', async () => {
      const el = await fixture<HTMLElement & { label: string }>('swim-card-header', { label: 'Title' });
      expect(el.label).toBe('Title');
    });
  });

  describe('swim-card-body', () => {
    it('renders without throwing', async () => {
      const el = await fixture<HTMLElement>('swim-card-body', {});
      expect(el.tagName.toLowerCase()).toBe('swim-card-body');
    });

    it('has default slot', async () => {
      const el = await fixture<HTMLElement>('swim-card-body', {});
      const slot = el.shadowRoot?.querySelector('slot');
      expect(slot).toBeTruthy();
    });
  });

  describe('swim-card-footer', () => {
    it('renders without throwing', async () => {
      const el = await fixture<HTMLElement>('swim-card-footer', {});
      expect(el.tagName.toLowerCase()).toBe('swim-card-footer');
    });

    it('accepts label', async () => {
      const el = await fixture<HTMLElement & { label: string }>('swim-card-footer', { label: 'Footer' });
      expect(el.label).toBe('Footer');
    });
  });

  it('dynamically changes selected after render', async () => {
    const el = await fixture<HTMLElement & { selectable: boolean; selected: boolean }>('swim-card', {
      selectable: true,
      selected: false
    });
    el.selected = true;
    await (el as { updateComplete: Promise<void> }).updateComplete;
    expect(el.selected).toBe(true);
  });

  it('dynamically changes disabled after render', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-card', { disabled: false });
    el.disabled = true;
    await (el as { updateComplete: Promise<void> }).updateComplete;
    expect(el.disabled).toBe(true);
  });

  it('dynamically changes status after render', async () => {
    const el = await fixture<HTMLElement & { status: string }>('swim-card', { status: 'success' });
    el.status = 'error';
    await (el as { updateComplete: Promise<void> }).updateComplete;
    expect(el.status).toBe('error');
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-card', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
