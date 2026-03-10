import { describe, it, expect } from 'vitest';
import {
  fixture,
  expectEventOnce,
  removeAndFlush,
  assertAccessible,
  createFormWithControl,
  waitForUpdate
} from '../../test-utils.js';

import '../../../../swim-ui/src/components/slider/index.js';

describe('swim-slider', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-slider', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-slider');
  });

  it('accepts min, max, value, step', async () => {
    const el = await fixture<HTMLElement & { min: number; max: number; value: number; step: number }>('swim-slider', {
      min: 0,
      max: 100,
      value: 50,
      step: 5
    });
    expect(Number(el.min)).toBe(0);
    expect(Number(el.max)).toBe(100);
    expect(Number(el.value)).toBe(50);
    expect(Number(el.step)).toBe(5);
  });

  it('reflects disabled', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-slider', { disabled: true });
    expect(el.disabled).toBe(true);
  });

  it('accepts orientation', async () => {
    const el = await fixture<HTMLElement & { orientation: string }>('swim-slider', { orientation: 'vertical' });
    expect(el.orientation).toBe('vertical');
  });

  it('accepts filled property', async () => {
    const el = await fixture<HTMLElement & { filled: boolean }>('swim-slider', { filled: true });
    expect(el.filled).toBe(true);
  });

  it('accepts showTicks and tickStep', async () => {
    const el = await fixture<HTMLElement & { showTicks: boolean; tickStep: number }>('swim-slider', {
      showTicks: true,
      tickStep: 10
    });
    expect(el.showTicks).toBe(true);
    expect(Number(el.tickStep)).toBe(10);
  });

  it('accepts ariaLabel', async () => {
    const el = await fixture<HTMLElement & { ariaLabel: string }>('swim-slider', { ariaLabel: 'Volume' });
    expect(el.ariaLabel).toBe('Volume');
  });

  it('emits change exactly once when input commits (no double emit)', async () => {
    const el = await fixture<HTMLElement & { value: number }>('swim-slider', { value: 50 });
    const input = el.shadowRoot?.querySelector('input[type="range"]') as HTMLInputElement;
    if (input) {
      input.value = '60';
      await expectEventOnce(el, 'change', () => input.dispatchEvent(new Event('change', { bubbles: true })));
    }
  });

  describe('dynamic property changes', () => {
    it('changes value after render', async () => {
      const el = await fixture<HTMLElement & { value: string | number }>('swim-slider', { value: 25 });
      el.value = 75;
      await waitForUpdate(el);
      expect(Number(el.value)).toBe(75);
    });

    it('changes min/max after render', async () => {
      const el = await fixture<HTMLElement & { min: number; max: number }>('swim-slider', { min: 0, max: 100 });
      el.min = 10;
      el.max = 200;
      await waitForUpdate(el);
      expect(Number(el.min)).toBe(10);
      expect(Number(el.max)).toBe(200);
    });

    it('changes disabled after render', async () => {
      const el = await fixture<HTMLElement & { disabled: boolean }>('swim-slider', { disabled: false });
      el.disabled = true;
      await waitForUpdate(el);
      expect(el.disabled).toBe(true);
    });
  });

  describe('form integration', () => {
    it('can be placed inside a form with a name', () => {
      const { form, control } = createFormWithControl('swim-slider', { name: 'volume', value: '50' });
      expect(control.parentElement).toBe(form);
      expect((control as HTMLElement & { name: string }).name).toBe('volume');
    });
  });

  describe('edge cases', () => {
    it('handles value at min boundary', async () => {
      const el = await fixture<HTMLElement & { min: number; max: number; value: number }>('swim-slider', {
        min: 0,
        max: 100,
        value: 0
      });
      expect(Number(el.value)).toBe(0);
    });

    it('handles value at max boundary', async () => {
      const el = await fixture<HTMLElement & { min: number; max: number; value: number }>('swim-slider', {
        min: 0,
        max: 100,
        value: 100
      });
      expect(Number(el.value)).toBe(100);
    });

    it('handles step=0.1 for decimal values', async () => {
      const el = await fixture<HTMLElement & { min: number; max: number; step: number; value: number }>('swim-slider', {
        min: 0,
        max: 1,
        step: 0.1,
        value: 0.5
      });
      expect(Number(el.value)).toBeCloseTo(0.5);
    });
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-slider', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('is accessible: has role group and focusable range input', async () => {
    const el = await fixture<HTMLElement>('swim-slider', { ariaLabel: 'Volume' });
    assertAccessible(el, { role: 'group', focusable: true });
  });
});
