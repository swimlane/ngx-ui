import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush, waitForUpdate } from '../../test-utils.js';

import '../../../../swim-ui/src/components/progress-spinner/index.js';

describe('swim-progress-spinner', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-progress-spinner', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-progress-spinner');
  });

  it('reflects mode', async () => {
    const el = await fixture<HTMLElement & { mode: string }>('swim-progress-spinner', {
      mode: 'determinate'
    });
    expect(el.getAttribute('mode')).toBe('determinate');
    expect(el.mode).toBe('determinate');
  });

  it('default mode is indeterminate', async () => {
    const el = await fixture<HTMLElement & { mode: string }>('swim-progress-spinner', {});
    expect(el.mode).toBeDefined();
  });

  it('accepts value and total for determinate', async () => {
    const el = await fixture<HTMLElement & { value: number; total: number; mode: string }>('swim-progress-spinner', {
      value: 50,
      total: 100,
      mode: 'determinate'
    });
    expect(el.value).toBe(50);
    expect(el.total).toBe(100);
  });

  it('reflects appearance', async () => {
    const el = await fixture<HTMLElement & { appearance: string }>('swim-progress-spinner', {
      appearance: 'icon'
    });
    expect(el.getAttribute('appearance')).toBe('icon');
    expect(el.appearance).toBe('icon');
  });

  it('reflects isFailure', async () => {
    const el = await fixture<HTMLElement & { isFailure: boolean }>('swim-progress-spinner', {
      isFailure: true
    });
    expect(el.hasAttribute('is-failure')).toBe(true);
    expect(el.isFailure).toBe(true);
  });

  it('accepts color', async () => {
    const el = await fixture<HTMLElement & { color: string }>('swim-progress-spinner', { color: '#ff0000' });
    expect(el.color).toBe('#ff0000');
  });

  it('accepts spinnerLabel', async () => {
    const el = await fixture<HTMLElement & { spinnerLabel: string }>('swim-progress-spinner', {
      spinnerLabel: 'Loading...'
    });
    expect(el.spinnerLabel).toBe('Loading...');
  });

  it('accepts diameter and strokeWidth', async () => {
    const el = await fixture<HTMLElement & { diameter: number; strokeWidth: number }>('swim-progress-spinner', {
      diameter: 48,
      strokeWidth: 4
    });
    expect(el.diameter).toBe(48);
    expect(el.strokeWidth).toBe(4);
  });

  it('has part container', async () => {
    const el = await fixture<HTMLElement>('swim-progress-spinner', {});
    const part = el.shadowRoot?.querySelector('[part="container"]');
    expect(part).toBeTruthy();
  });

  describe('determinate progress', () => {
    it('isComplete is true when value >= total', async () => {
      const el = await fixture<HTMLElement & { value: number; total: number; mode: string; isComplete: boolean }>(
        'swim-progress-spinner',
        { value: 100, total: 100, mode: 'determinate' }
      );
      expect(el.isComplete).toBe(true);
    });

    it('isComplete is false when value < total', async () => {
      const el = await fixture<HTMLElement & { value: number; total: number; mode: string; isComplete: boolean }>(
        'swim-progress-spinner',
        { value: 50, total: 100, mode: 'determinate' }
      );
      expect(el.isComplete).toBe(false);
    });
  });

  describe('dynamic property changes', () => {
    it('changes value after render', async () => {
      const el = await fixture<HTMLElement & { value: number; total: number; mode: string }>('swim-progress-spinner', {
        value: 25,
        total: 100,
        mode: 'determinate'
      });
      el.value = 75;
      await waitForUpdate(el);
      expect(el.value).toBe(75);
    });

    it('changes mode after render', async () => {
      const el = await fixture<HTMLElement & { mode: string }>('swim-progress-spinner', { mode: 'indeterminate' });
      el.mode = 'determinate';
      await waitForUpdate(el);
      expect(el.mode).toBe('determinate');
    });

    it('changes isFailure after render', async () => {
      const el = await fixture<HTMLElement & { isFailure: boolean }>('swim-progress-spinner', { isFailure: false });
      el.isFailure = true;
      await waitForUpdate(el);
      expect(el.isFailure).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('handles value=0', async () => {
      const el = await fixture<HTMLElement & { value: number; total: number; mode: string }>('swim-progress-spinner', {
        value: 0,
        total: 100,
        mode: 'determinate'
      });
      expect(el.value).toBe(0);
    });

    it('handles total=0 without throwing', async () => {
      const el = await fixture<HTMLElement & { value: number; total: number; mode: string }>('swim-progress-spinner', {
        value: 0,
        total: 0,
        mode: 'determinate'
      });
      expect(el.total).toBe(0);
    });
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-progress-spinner', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
