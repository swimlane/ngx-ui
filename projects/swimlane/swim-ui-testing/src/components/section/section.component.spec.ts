import { describe, it, expect } from 'vitest';
import {
  fixture,
  oneEvent,
  expectEventOnce,
  removeAndFlush,
  assertAccessible,
  waitForUpdate
} from '../../test-utils.js';

import '../../../../swim-ui/src/components/section/index.js';

describe('swim-section', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-section', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-section');
  });

  it('reflects sectionCollapsed and sectionCollapsible', async () => {
    const el = await fixture<HTMLElement & { sectionCollapsed: boolean; sectionCollapsible: boolean }>('swim-section', {
      sectionCollapsed: true,
      sectionCollapsible: true
    });
    expect(el.sectionCollapsed).toBe(true);
    expect(el.sectionCollapsible).toBe(true);
  });

  it('accepts sectionTitle', async () => {
    const el = await fixture<HTMLElement & { sectionTitle: string }>('swim-section', {
      sectionTitle: 'Details'
    });
    expect(el.sectionTitle).toBe('Details');
  });

  it('accepts padding property', async () => {
    const el = await fixture<HTMLElement & { padding: string }>('swim-section', { padding: '16px' });
    expect(el.padding).toBe('16px');
  });

  it('accepts appearance property', async () => {
    const el = await fixture<HTMLElement & { appearance: string }>('swim-section', { appearance: 'outline' });
    expect(el.appearance).toBe('outline');
  });

  it('accepts togglePosition property', async () => {
    const el = await fixture<HTMLElement & { togglePosition: string }>('swim-section', {
      togglePosition: 'left'
    });
    expect(el.togglePosition).toBe('left');
  });

  it('accepts headerToggle property', async () => {
    const el = await fixture<HTMLElement & { headerToggle: boolean }>('swim-section', { headerToggle: true });
    expect(el.headerToggle).toBe(true);
  });

  it('has slot for content', async () => {
    const el = await fixture<HTMLElement>('swim-section', {});
    const slots = el.shadowRoot?.querySelectorAll('slot');
    expect(slots?.length).toBeGreaterThanOrEqual(1);
  });

  it('emits toggle exactly once when header is clicked (collapsible + headerToggle)', async () => {
    const el = await fixture<
      HTMLElement & { sectionCollapsible: boolean; headerToggle: boolean; sectionTitle: string }
    >('swim-section', {
      sectionCollapsible: true,
      headerToggle: true,
      sectionTitle: 'Title'
    });
    await waitForUpdate(el);
    const header = el.shadowRoot?.querySelector('.swim-section__header');
    expect(header).toBeTruthy();
    await expectEventOnce(el, 'toggle', () => header!.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  });

  it('fires toggle with collapsed detail', async () => {
    const el = await fixture<
      HTMLElement & {
        sectionCollapsible: boolean;
        headerToggle: boolean;
        sectionTitle: string;
        sectionCollapsed: boolean;
      }
    >('swim-section', {
      sectionCollapsible: true,
      headerToggle: true,
      sectionTitle: 'Title',
      sectionCollapsed: false
    });
    await waitForUpdate(el);
    const header = el.shadowRoot?.querySelector('.swim-section__header');
    const togglePromise = oneEvent(el, 'toggle');
    header!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const e = await togglePromise;
    expect(e).toBeDefined();
  });

  describe('composition with content', () => {
    it('renders child content through slot', async () => {
      const el = await fixture<HTMLElement & { sectionTitle: string }>('swim-section', {
        sectionTitle: 'Info'
      });
      const p = document.createElement('p');
      p.textContent = 'Section body';
      el.appendChild(p);
      await waitForUpdate(el);
      expect(el.children.length).toBe(1);
    });

    it('renders swim-section-header through header slot', async () => {
      const el = await fixture<HTMLElement>('swim-section', {});
      const header = document.createElement('swim-section-header');
      header.setAttribute('slot', 'header');
      header.textContent = 'Custom Header';
      el.appendChild(header);
      await waitForUpdate(el);
      expect(el.querySelector('swim-section-header')).toBeTruthy();
    });
  });

  describe('dynamic property changes', () => {
    it('toggles sectionCollapsed after render', async () => {
      const el = await fixture<HTMLElement & { sectionCollapsed: boolean; sectionCollapsible: boolean }>(
        'swim-section',
        { sectionCollapsed: false, sectionCollapsible: true }
      );
      el.sectionCollapsed = true;
      await waitForUpdate(el);
      expect(el.sectionCollapsed).toBe(true);
    });

    it('changes sectionTitle after render', async () => {
      const el = await fixture<HTMLElement & { sectionTitle: string }>('swim-section', { sectionTitle: 'Old' });
      el.sectionTitle = 'New';
      await waitForUpdate(el);
      expect(el.sectionTitle).toBe('New');
    });
  });

  describe('edge cases', () => {
    it('non-collapsible section does not emit toggle on header click', async () => {
      const el = await fixture<HTMLElement & { sectionCollapsible: boolean; sectionTitle: string }>('swim-section', {
        sectionCollapsible: false,
        sectionTitle: 'Title'
      });
      await waitForUpdate(el);
      let fired = false;
      el.addEventListener('toggle', () => {
        fired = true;
      });
      const header = el.shadowRoot?.querySelector('.swim-section__header');
      if (header) {
        header.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
      await new Promise(r => setTimeout(r, 30));
      expect(fired).toBe(false);
    });
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-section', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('is accessible: has focusable header when collapsible', async () => {
    const el = await fixture<HTMLElement & { sectionCollapsible: boolean }>('swim-section', {
      sectionCollapsible: true,
      sectionTitle: 'Section'
    });
    await waitForUpdate(el);
    assertAccessible(el, { focusable: true });
  });
});

describe('swim-section-header', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-section-header', {});
    expect(el.tagName.toLowerCase()).toBe('swim-section-header');
  });

  it('has default slot for content', async () => {
    const el = await fixture<HTMLElement>('swim-section-header', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });
});
