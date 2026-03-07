import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, removeAndFlush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/list/index.js';

describe('swim-list', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-list', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-list');
  });

  it('renders with shadow DOM', async () => {
    const el = await fixture<HTMLElement>('swim-list', {});
    expect(el.shadowRoot).toBeTruthy();
  });

  it('accepts columnLayout', async () => {
    const el = await fixture<HTMLElement & { columnLayout: string }>('swim-list', {
      columnLayout: '1fr 2fr 1fr'
    });
    expect(el.columnLayout).toBe('1fr 2fr 1fr');
  });

  it('accepts headerLabels and renders header cells', async () => {
    const el = await fixture<HTMLElement & { headerLabels: string[]; columns: string[] }>('swim-list', {
      headerLabels: ['Name', 'Age', 'City'],
      columns: ['name', 'age', 'city']
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const headers = el.shadowRoot?.querySelectorAll('.swim-list__header-cell');
    expect(headers?.length).toBe(3);
    expect(headers?.[0]?.textContent).toBe('Name');
    expect(headers?.[1]?.textContent).toBe('Age');
    expect(headers?.[2]?.textContent).toBe('City');
  });

  it('renders rows from dataSource', async () => {
    const data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 }
    ];
    const el = await fixture<
      HTMLElement & { dataSource: Record<string, unknown>[]; columns: string[]; headerLabels: string[] }
    >('swim-list', {
      dataSource: data,
      columns: ['name', 'age'],
      headerLabels: ['Name', 'Age']
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const rows = el.shadowRoot?.querySelectorAll('.swim-list__row');
    expect(rows?.length).toBe(2);
  });

  it('renders cell values from column keys', async () => {
    const el = await fixture<
      HTMLElement & { dataSource: Record<string, unknown>[]; columns: string[]; headerLabels: string[] }
    >('swim-list', {
      dataSource: [{ name: 'Alice', age: 30 }],
      columns: ['name', 'age'],
      headerLabels: ['Name', 'Age']
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const cells = el.shadowRoot?.querySelectorAll('.swim-list__cell');
    expect(cells?.[0]?.textContent?.trim()).toBe('Alice');
    expect(cells?.[1]?.textContent?.trim()).toBe('30');
  });

  it('renders $index column as 1-based row number', async () => {
    const el = await fixture<
      HTMLElement & { dataSource: Record<string, unknown>[]; columns: string[]; headerLabels: string[] }
    >('swim-list', {
      dataSource: [{ name: 'A' }, { name: 'B' }],
      columns: ['$index', 'name'],
      headerLabels: ['#', 'Name']
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const cells = el.shadowRoot?.querySelectorAll('.swim-list__cell');
    expect(cells?.[0]?.textContent?.trim()).toBe('1.');
    expect(cells?.[2]?.textContent?.trim()).toBe('2.');
  });

  it('renders empty string for null/undefined cell values', async () => {
    const el = await fixture<HTMLElement & { dataSource: Record<string, unknown>[]; columns: string[] }>('swim-list', {
      dataSource: [{ name: null, missing: undefined }],
      columns: ['name', 'missing', 'nonexistent']
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const cells = el.shadowRoot?.querySelectorAll('.swim-list__cell');
    expect(cells?.[0]?.textContent?.trim()).toBe('');
    expect(cells?.[1]?.textContent?.trim()).toBe('');
    expect(cells?.[2]?.textContent?.trim()).toBe('');
  });

  it('accepts defaultRowStatus and applies it to rows', async () => {
    const el = await fixture<
      HTMLElement & { defaultRowStatus: string; dataSource: Record<string, unknown>[]; columns: string[] }
    >('swim-list', {
      defaultRowStatus: 'success',
      dataSource: [{ x: 1 }],
      columns: ['x']
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const row = el.shadowRoot?.querySelector('.swim-list__row');
    expect(row?.classList.contains('swim-list__row--success')).toBe(true);
  });

  it('per-row status overrides default', async () => {
    const el = await fixture<
      HTMLElement & { defaultRowStatus: string; dataSource: Record<string, unknown>[]; columns: string[] }
    >('swim-list', {
      defaultRowStatus: 'error',
      dataSource: [{ x: 1, status: 'warning' }],
      columns: ['x']
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const row = el.shadowRoot?.querySelector('.swim-list__row');
    expect(row?.classList.contains('swim-list__row--warning')).toBe(true);
  });

  it('accepts height property', async () => {
    const el = await fixture<HTMLElement & { height: number }>('swim-list', { height: 200 });
    expect(el.height).toBe(200);
  });

  it('dynamically updates rows when dataSource changes', async () => {
    const el = await fixture<HTMLElement & { dataSource: Record<string, unknown>[]; columns: string[] }>('swim-list', {
      dataSource: [{ a: 1 }],
      columns: ['a']
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    expect(el.shadowRoot?.querySelectorAll('.swim-list__row')?.length).toBe(1);

    el.dataSource = [{ a: 1 }, { a: 2 }, { a: 3 }];
    await (el as { updateComplete: Promise<void> }).updateComplete;
    expect(el.shadowRoot?.querySelectorAll('.swim-list__row')?.length).toBe(3);
  });

  it('renders with empty dataSource', async () => {
    const el = await fixture<
      HTMLElement & { dataSource: Record<string, unknown>[]; columns: string[]; headerLabels: string[] }
    >('swim-list', {
      dataSource: [],
      columns: ['a'],
      headerLabels: ['A']
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const rows = el.shadowRoot?.querySelectorAll('.swim-list__row');
    expect(rows?.length).toBe(0);
    const headers = el.shadowRoot?.querySelectorAll('.swim-list__header-cell');
    expect(headers?.length).toBeGreaterThanOrEqual(1);
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-list', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
