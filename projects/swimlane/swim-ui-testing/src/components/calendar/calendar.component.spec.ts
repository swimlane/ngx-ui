import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, removeAndFlush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/calendar/index.js';

describe('swim-calendar', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-calendar', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-calendar');
  });

  it('accepts value as Date', async () => {
    const d = new Date(2024, 0, 15);
    const el = await fixture<HTMLElement & { value: Date }>('swim-calendar', { value: d });
    expect(el.value).toEqual(d);
  });

  it('default value is null when not set', async () => {
    const el = await fixture<HTMLElement & { value: Date | null }>('swim-calendar', {});
    expect(el.value).toBeNull();
  });

  it('accepts minDate and maxDate', async () => {
    const min = new Date(2024, 0, 1);
    const max = new Date(2024, 11, 31);
    const el = await fixture<HTMLElement & { minDate: Date; maxDate: Date }>('swim-calendar', {
      minDate: min,
      maxDate: max
    });
    expect(el.minDate).toEqual(min);
    expect(el.maxDate).toEqual(max);
  });

  it('reflects disabled', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-calendar', { disabled: true });
    expect(el.disabled).toBe(true);
  });

  it('accepts minView property', async () => {
    const el = await fixture<HTMLElement & { minView: string }>('swim-calendar', { minView: 'month' });
    expect(el.minView).toBe('month');
  });

  it('has grid of days', async () => {
    const el = await fixture<HTMLElement>('swim-calendar', {});
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const grid = el.shadowRoot?.querySelector('[role="grid"], .day-container, [class*="day"]');
    expect(grid).toBeTruthy();
  });

  it('renders day elements when value is set', async () => {
    const el = await fixture<HTMLElement & { value: Date }>('swim-calendar', {
      value: new Date(2024, 0, 15)
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const dayElements = el.shadowRoot?.querySelectorAll('button, [class*="day"]');
    expect(dayElements?.length).toBeGreaterThan(0);
  });

  it('dynamically changes value after render', async () => {
    const el = await fixture<HTMLElement & { value: Date | null }>('swim-calendar', {
      value: new Date(2024, 0, 15)
    });
    const newDate = new Date(2024, 5, 20);
    el.value = newDate;
    await (el as { updateComplete: Promise<void> }).updateComplete;
    expect(el.value).toEqual(newDate);
  });

  it('dynamically changes disabled after render', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-calendar', { disabled: false });
    el.disabled = true;
    await (el as { updateComplete: Promise<void> }).updateComplete;
    expect(el.disabled).toBe(true);
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-calendar', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
