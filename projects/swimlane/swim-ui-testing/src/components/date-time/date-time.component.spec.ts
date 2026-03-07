import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, removeAndFlush, assertAccessible } from '../../test-utils.js';

import '../../../../swim-ui/src/components/date-time/index.js';

describe('swim-date-time', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-date-time', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-date-time');
  });

  it('accepts string value', async () => {
    const el = await fixture<HTMLElement & { value: string }>('swim-date-time', {
      value: '2024-01-15T10:00:00'
    });
    expect(el.value).toBeDefined();
  });

  it('accepts Date value', async () => {
    const d = new Date(2024, 0, 15, 10, 0, 0);
    const el = await fixture<HTMLElement & { value: Date | string | null }>('swim-date-time', { value: d });
    expect(el.value).toBeDefined();
  });

  it('accepts label, placeholder, hint', async () => {
    const el = await fixture<HTMLElement & { label: string; placeholder: string; hint: string }>('swim-date-time', {
      label: 'Start Date',
      placeholder: 'Pick a date',
      hint: 'Required field'
    });
    expect(el.label).toBe('Start Date');
    expect(el.placeholder).toBe('Pick a date');
    expect(el.hint).toBe('Required field');
  });

  it('reflects disabled', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-date-time', { disabled: true });
    expect(el.disabled).toBe(true);
  });

  it('reflects required', async () => {
    const el = await fixture<HTMLElement & { required: boolean }>('swim-date-time', { required: true });
    expect(el.required).toBe(true);
  });

  it('accepts size property (sm, md, lg)', async () => {
    const el = await fixture<HTMLElement & { size: string }>('swim-date-time', { size: 'lg' });
    expect(el.size).toBe('lg');
  });

  it('accepts appearance property', async () => {
    const el = await fixture<HTMLElement & { appearance: string }>('swim-date-time', { appearance: 'fill' });
    expect(el.appearance).toBe('fill');
  });

  it('accepts name for form submission', async () => {
    const el = await fixture<HTMLElement & { name: string }>('swim-date-time', { name: 'startDate' });
    expect(el.name).toBe('startDate');
  });

  it('accepts minDate and maxDate', async () => {
    const min = new Date(2024, 0, 1);
    const max = new Date(2024, 11, 31);
    const el = await fixture<HTMLElement & { minDate: Date; maxDate: Date }>('swim-date-time', {
      minDate: min,
      maxDate: max
    });
    expect(el.minDate).toEqual(min);
    expect(el.maxDate).toEqual(max);
  });

  it('accepts precision property', async () => {
    const el = await fixture<HTMLElement & { precision: string }>('swim-date-time', { precision: 'hours' });
    expect(el.precision).toBe('hours');
  });

  it('has css part input', async () => {
    const el = await fixture<HTMLElement>('swim-date-time', { label: 'Date' });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const part = el.shadowRoot?.querySelector('[part="input"]');
    expect(part).toBeTruthy();
  });

  it('dynamically changes value after render', async () => {
    const el = await fixture<HTMLElement & { value: string | Date | null }>('swim-date-time', {
      value: '2024-01-15'
    });
    el.value = '2024-06-30';
    await (el as { updateComplete: Promise<void> }).updateComplete;
    expect(el.value).toBeDefined();
  });

  it('dynamically changes disabled after render', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-date-time', { disabled: false });
    expect(el.disabled).toBe(false);
    el.disabled = true;
    await (el as { updateComplete: Promise<void> }).updateComplete;
    expect(el.disabled).toBe(true);
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-date-time', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
