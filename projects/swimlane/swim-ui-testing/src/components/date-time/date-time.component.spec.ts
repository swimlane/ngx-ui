import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/date-time/index.js';

describe('swim-date-time', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-date-time', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-date-time');
  });

  it('accepts value', async () => {
    const el = await fixture<HTMLElement & { value: string }>('swim-date-time', {
      value: '2024-01-15T10:00:00'
    });
    const val = el.value;
    expect(val != null && (typeof val === 'string' || val instanceof Date)).toBe(true);
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-date-time', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
