import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush, flush, waitForUpdate } from '../../test-utils.js';

import '../../../../swim-ui/src/components/navbar/index.js';

async function createNavbarWithItems(count = 3) {
  const el = await fixture<HTMLElement & { active: number; barAtTop: boolean; goTo: (i: number) => void }>(
    'swim-navbar',
    {}
  );

  for (let i = 0; i < count; i++) {
    const item = document.createElement('swim-navbar-item');
    item.textContent = `Tab ${i}`;
    el.appendChild(item);
  }

  await waitForUpdate(el);
  await flush();
  await new Promise(r => setTimeout(r, 50));
  return el;
}

describe('swim-navbar', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-navbar', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-navbar');
  });

  it('accepts active index', async () => {
    const el = await fixture<HTMLElement & { active: number }>('swim-navbar', { active: 1 });
    expect(el.active).toBe(1);
  });

  it('has slot for items', async () => {
    const el = await fixture<HTMLElement>('swim-navbar', {});
    expect(el.shadowRoot?.querySelector('slot')).toBeTruthy();
  });

  it('has css parts: nav-items, bar-track, bar', async () => {
    const el = await fixture<HTMLElement>('swim-navbar', {});
    expect(el.shadowRoot?.querySelector('[part="nav-items"]')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('[part="bar-track"]')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('[part="bar"]')).toBeTruthy();
  });

  it('reflects barAtTop', async () => {
    const el = await fixture<HTMLElement & { barAtTop: boolean }>('swim-navbar', { barAtTop: true });
    expect(el.barAtTop).toBe(true);
  });

  it('default active is 0', async () => {
    const el = await fixture<HTMLElement & { active: number }>('swim-navbar', {});
    expect(el.active).toBe(0);
  });

  describe('composition with swim-navbar-item', () => {
    it('renders navbar items as slot children', async () => {
      const el = await createNavbarWithItems(3);
      expect(el.children.length).toBe(3);
      for (const child of Array.from(el.children)) {
        expect(child.tagName.toLowerCase()).toBe('swim-navbar-item');
      }
    });

    it('goTo changes active index', async () => {
      const el = await createNavbarWithItems(3);
      el.goTo(2);
      await waitForUpdate(el);
      await new Promise(r => setTimeout(r, 50));
      expect(el.active).toBe(2);
    });

    it('goTo is a no-op for out-of-range index', async () => {
      const el = await createNavbarWithItems(3);
      el.goTo(10);
      await waitForUpdate(el);
      expect(el.active).toBe(0);
    });

    it('goTo is a no-op for the already-active index', async () => {
      const el = await createNavbarWithItems(3);
      el.goTo(0);
      await waitForUpdate(el);
      expect(el.active).toBe(0);
    });
  });

  it('dynamically changes active after render', async () => {
    const el = await createNavbarWithItems(3);
    expect(el.active).toBe(0);
    el.active = 2;
    await waitForUpdate(el);
    expect(el.active).toBe(2);
  });

  it('has role tablist', async () => {
    const el = await fixture<HTMLElement>('swim-navbar', {});
    const tablist = el.shadowRoot?.querySelector('[role="tablist"]');
    expect(tablist).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-navbar', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});

describe('swim-navbar-item', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-navbar-item', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-navbar-item');
  });

  it('has default slot for content', async () => {
    const el = await fixture<HTMLElement>('swim-navbar-item', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-navbar-item', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
