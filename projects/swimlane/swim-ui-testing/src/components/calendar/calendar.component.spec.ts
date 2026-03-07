import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush } from '../../test-utils.js';

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

  it('has grid of days (role=grid or day-container)', async () => {
    const el = await fixture<HTMLElement>('swim-calendar', {});
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const grid = el.shadowRoot?.querySelector('[role="grid"], .day-container, [class*="day"]');
    expect(grid).toBeTruthy();
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-calendar', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
