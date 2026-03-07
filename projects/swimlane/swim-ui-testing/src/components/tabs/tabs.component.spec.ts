import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, expectEventOnce, removeAndFlush, flush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/tabs/index.js';

async function createTabsWithPanels(labels: string[], opts: { disabledIndices?: number[] } = {}) {
  const el = await fixture<HTMLElement & { vertical: boolean; appearance: string; prev: () => void; next: () => void }>(
    'swim-tabs',
    {}
  );

  for (let i = 0; i < labels.length; i++) {
    const tab = document.createElement('swim-tab') as HTMLElement & {
      label: string;
      active: boolean;
      disabled: boolean;
    };
    tab.label = labels[i];
    tab.textContent = `Content for ${labels[i]}`;
    if (opts.disabledIndices?.includes(i)) {
      tab.disabled = true;
    }
    el.appendChild(tab);
  }

  await (el as { updateComplete: Promise<void> }).updateComplete;
  await flush();
  await new Promise(r => setTimeout(r, 20));
  await (el as { updateComplete: Promise<void> }).updateComplete;
  return el;
}

describe('swim-tabs', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-tabs', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-tabs');
  });

  it('reflects vertical and appearance', async () => {
    const el = await fixture<HTMLElement & { vertical: boolean; appearance: string }>('swim-tabs', {
      vertical: true,
      appearance: 'light'
    });
    expect(el.vertical).toBe(true);
    expect(el.appearance).toBe('light');
  });

  it('has slot and css parts', async () => {
    const el = await fixture<HTMLElement>('swim-tabs', {});
    expect(el.shadowRoot?.querySelector('slot')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('[part="tablist"]')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('[part="tab-content"]')).toBeTruthy();
  });

  it('has role tablist', async () => {
    const el = await fixture<HTMLElement>('swim-tabs', {});
    expect(el.shadowRoot?.querySelector('[role="tablist"]')).toBeTruthy();
  });

  describe('composition with swim-tab', () => {
    it('renders tab buttons from swim-tab children', async () => {
      const el = await createTabsWithPanels(['Alpha', 'Beta', 'Gamma']);
      const tabBtns = el.shadowRoot?.querySelectorAll('[role="tab"]');
      expect(tabBtns?.length).toBe(3);
      expect(tabBtns?.[0]?.textContent?.trim()).toBe('Alpha');
      expect(tabBtns?.[1]?.textContent?.trim()).toBe('Beta');
      expect(tabBtns?.[2]?.textContent?.trim()).toBe('Gamma');
    });

    it('first tab is active by default', async () => {
      const el = await createTabsWithPanels(['A', 'B', 'C']);
      const tabBtns = el.shadowRoot?.querySelectorAll('[role="tab"]');
      expect(tabBtns?.[0]?.getAttribute('aria-selected')).toBe('true');
    });

    it('clicking a tab activates it and fires select-tab', async () => {
      const el = await createTabsWithPanels(['A', 'B', 'C']);
      const tabBtns = el.shadowRoot?.querySelectorAll('[role="tab"]');
      const selectPromise = oneEvent(el, 'select-tab');
      (tabBtns?.[1] as HTMLElement)?.click();
      const e = await selectPromise;
      expect(e).toBeDefined();
      expect((e as CustomEvent).detail?.tab).toBeDefined();
    });

    it('clicking a tab also fires select (alias)', async () => {
      const el = await createTabsWithPanels(['A', 'B']);
      const tabBtns = el.shadowRoot?.querySelectorAll('[role="tab"]');
      const selectPromise = oneEvent(el, 'select');
      (tabBtns?.[1] as HTMLElement)?.click();
      const e = await selectPromise;
      expect(e).toBeDefined();
    });

    it('clicking disabled tab does not activate it', async () => {
      const el = await createTabsWithPanels(['A', 'B', 'C'], { disabledIndices: [1] });
      const tabBtns = el.shadowRoot?.querySelectorAll('[role="tab"]');
      let fired = false;
      el.addEventListener('select-tab', () => {
        fired = true;
      });
      (tabBtns?.[1] as HTMLElement)?.click();
      await new Promise(r => setTimeout(r, 30));
      expect(fired).toBe(false);
      expect(tabBtns?.[0]?.getAttribute('aria-selected')).toBe('true');
    });

    it('disabled tab button has disabled attribute', async () => {
      const el = await createTabsWithPanels(['A', 'B'], { disabledIndices: [1] });
      const tabBtns = el.shadowRoot?.querySelectorAll('[role="tab"]');
      expect(tabBtns?.[1]?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('prev() and next() navigation', () => {
    it('next() advances to next tab', async () => {
      const el = await createTabsWithPanels(['A', 'B', 'C']);
      const selectPromise = oneEvent(el, 'select-tab');
      (el as { next: () => void }).next();
      const e = await selectPromise;
      expect(e).toBeDefined();
    });

    it('prev() goes to previous tab', async () => {
      const el = await createTabsWithPanels(['A', 'B', 'C']);
      (el as { next: () => void }).next();
      await new Promise(r => setTimeout(r, 20));
      const selectPromise = oneEvent(el, 'select-tab');
      (el as { prev: () => void }).prev();
      const e = await selectPromise;
      expect(e).toBeDefined();
    });

    it('next() skips disabled tabs', async () => {
      const el = await createTabsWithPanels(['A', 'B', 'C'], { disabledIndices: [1] });
      const selectPromise = oneEvent(el, 'select-tab');
      (el as { next: () => void }).next();
      const e = await selectPromise;
      expect((e as CustomEvent).detail?.tab?.label).toBe('C');
    });
  });

  describe('keyboard navigation', () => {
    it('ArrowRight activates next tab (horizontal)', async () => {
      const el = await createTabsWithPanels(['A', 'B', 'C']);
      const tablist = el.shadowRoot?.querySelector('[role="tablist"]') as HTMLElement;
      const selectPromise = oneEvent(el, 'select-tab');
      tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      const e = await selectPromise;
      expect(e).toBeDefined();
    });

    it('ArrowLeft activates previous tab (horizontal)', async () => {
      const el = await createTabsWithPanels(['A', 'B', 'C']);
      (el as { next: () => void }).next();
      await new Promise(r => setTimeout(r, 20));
      const tablist = el.shadowRoot?.querySelector('[role="tablist"]') as HTMLElement;
      const selectPromise = oneEvent(el, 'select-tab');
      tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
      const e = await selectPromise;
      expect(e).toBeDefined();
    });

    it('ArrowDown activates next tab (vertical mode)', async () => {
      const el = await createTabsWithPanels(['A', 'B', 'C']);
      (el as { vertical: boolean }).vertical = true;
      await (el as { updateComplete: Promise<void> }).updateComplete;
      const tablist = el.shadowRoot?.querySelector('[role="tablist"]') as HTMLElement;
      const selectPromise = oneEvent(el, 'select-tab');
      tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      const e = await selectPromise;
      expect(e).toBeDefined();
    });

    it('ArrowUp activates previous tab (vertical mode)', async () => {
      const el = await createTabsWithPanels(['A', 'B', 'C']);
      (el as { vertical: boolean }).vertical = true;
      (el as { next: () => void }).next();
      await new Promise(r => setTimeout(r, 20));
      await (el as { updateComplete: Promise<void> }).updateComplete;
      const tablist = el.shadowRoot?.querySelector('[role="tablist"]') as HTMLElement;
      const selectPromise = oneEvent(el, 'select-tab');
      tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      const e = await selectPromise;
      expect(e).toBeDefined();
    });
  });

  it('dynamically changes vertical after render', async () => {
    const el = await fixture<HTMLElement & { vertical: boolean }>('swim-tabs', { vertical: false });
    expect(el.vertical).toBe(false);
    el.vertical = true;
    await (el as { updateComplete: Promise<void> }).updateComplete;
    expect(el.vertical).toBe(true);
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-tabs', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});

describe('swim-tab', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-tab', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-tab');
  });

  it('accepts label', async () => {
    const el = await fixture<HTMLElement & { label: string }>('swim-tab', { label: 'Details' });
    expect(el.label).toBe('Details');
  });

  it('title is an alias for label', async () => {
    const el = await fixture<HTMLElement & { label: string; title: string }>('swim-tab', { title: 'Info' });
    expect(el.label).toBe('Info');
    expect(el.title).toBe('Info');
  });

  it('reflects active', async () => {
    const el = await fixture<HTMLElement & { active: boolean }>('swim-tab', { active: true });
    expect(el.active).toBe(true);
  });

  it('reflects disabled', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-tab', { disabled: true });
    expect(el.disabled).toBe(true);
  });

  it('has role tabpanel', async () => {
    const el = await fixture<HTMLElement>('swim-tab', { label: 'X' });
    expect(el.shadowRoot?.querySelector('[role="tabpanel"]')).toBeTruthy();
  });

  it('panel is hidden when not active', async () => {
    const el = await fixture<HTMLElement & { active: boolean }>('swim-tab', { active: false, label: 'X' });
    const panel = el.shadowRoot?.querySelector('[role="tabpanel"]');
    expect(panel?.hasAttribute('hidden')).toBe(true);
  });

  it('panel is visible when active', async () => {
    const el = await fixture<HTMLElement & { active: boolean }>('swim-tab', { active: true, label: 'X' });
    const panel = el.shadowRoot?.querySelector('[role="tabpanel"]');
    expect(panel?.hasAttribute('hidden')).toBe(false);
  });

  it('has default slot for content', async () => {
    const el = await fixture<HTMLElement>('swim-tab', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });
});
