import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush, waitForUpdate } from '../../test-utils.js';

import '../../../../swim-ui/src/components/split/index.js';

describe('swim-split', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-split', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-split');
  });

  it('has slot for split areas', async () => {
    const el = await fixture<HTMLElement>('swim-split', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('reflects direction property with default row', async () => {
    const el = await fixture<HTMLElement & { direction: string }>('swim-split', {});
    expect(el.direction).toBe('row');
  });

  it('accepts direction column', async () => {
    const el = await fixture<HTMLElement & { direction: string }>('swim-split', { direction: 'column' });
    expect(el.direction).toBe('column');
    expect(el.getAttribute('direction')).toBe('column');
  });

  it('dynamically changes direction after render', async () => {
    const el = await fixture<HTMLElement & { direction: string }>('swim-split', { direction: 'row' });
    expect(el.direction).toBe('row');
    el.direction = 'column';
    await waitForUpdate(el);
    expect(el.direction).toBe('column');
    expect(el.getAttribute('direction')).toBe('column');
  });

  describe('composition with swim-split-area and swim-split-handle', () => {
    it('renders split areas as slot children', async () => {
      const el = await fixture<HTMLElement>('swim-split', {});
      const area1 = document.createElement('swim-split-area');
      area1.textContent = 'Panel A';
      const handle = document.createElement('swim-split-handle');
      const area2 = document.createElement('swim-split-area');
      area2.textContent = 'Panel B';
      el.appendChild(area1);
      el.appendChild(handle);
      el.appendChild(area2);
      await waitForUpdate(el);

      expect(el.children.length).toBe(3);
      expect(el.children[0].tagName.toLowerCase()).toBe('swim-split-area');
      expect(el.children[1].tagName.toLowerCase()).toBe('swim-split-handle');
      expect(el.children[2].tagName.toLowerCase()).toBe('swim-split-area');
    });
  });

  describe('swim-split-area', () => {
    it('renders without throwing', async () => {
      const el = await fixture<HTMLElement>('swim-split-area', {});
      expect(el).toBeDefined();
      expect(el.tagName.toLowerCase()).toBe('swim-split-area');
    });

    it('has default areaBasis', async () => {
      const el = await fixture<HTMLElement & { areaBasis: string }>('swim-split-area', {});
      expect(el.areaBasis).toBeDefined();
    });

    it('accepts areaBasis, minBasis, maxBasis', async () => {
      const el = await fixture<HTMLElement & { areaBasis: string; minBasis: string; maxBasis: string }>(
        'swim-split-area',
        { areaBasis: '1 1 200px', minBasis: '100px', maxBasis: '400px' }
      );
      expect(el.areaBasis).toBe('1 1 200px');
      expect(el.minBasis).toBe('100px');
      expect(el.maxBasis).toBe('400px');
    });

    it('updateBasis updates internal flex basis without changing areaBasis', async () => {
      const el = await fixture<HTMLElement & { areaBasis: string; updateBasis: (v: string) => void }>(
        'swim-split-area',
        { areaBasis: '1 1 100px' }
      );
      el.updateBasis('200px');
      await waitForUpdate(el);
      expect(el.areaBasis).toBe('1 1 100px');
    });

    it('has default slot for content', async () => {
      const el = await fixture<HTMLElement>('swim-split-area', {});
      const slot = el.shadowRoot?.querySelector('slot');
      expect(slot).toBeTruthy();
    });
  });

  describe('swim-split-handle', () => {
    it('renders without throwing', async () => {
      const el = await fixture<HTMLElement>('swim-split-handle', {});
      expect(el).toBeDefined();
      expect(el.tagName.toLowerCase()).toBe('swim-split-handle');
    });

    it('has default handleBasis', async () => {
      const el = await fixture<HTMLElement & { handleBasis: string }>('swim-split-handle', {});
      expect(el.handleBasis).toBeDefined();
    });

    it('accepts direction property', async () => {
      const el = await fixture<HTMLElement & { direction: string }>('swim-split-handle', { direction: 'row' });
      expect(el.direction).toBe('row');
    });
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-split', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
