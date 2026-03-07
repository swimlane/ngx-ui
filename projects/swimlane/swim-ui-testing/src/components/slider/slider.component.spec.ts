import { describe, it, expect } from 'vitest';
import { fixture, expectEventOnce, removeAndFlush, assertAccessible } from '../../test-utils.js';

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

  it('emits change exactly once when input commits (no double emit)', async () => {
    const el = await fixture<HTMLElement & { value: number }>('swim-slider', { value: 50 });
    const input = el.shadowRoot?.querySelector('input[type="range"]') as HTMLInputElement;
    if (input) {
      input.value = '60';
      await expectEventOnce(el, 'change', () => input.dispatchEvent(new Event('change', { bubbles: true })));
    }
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
