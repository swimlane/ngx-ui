import { describe, it, expect } from 'vitest';
import { fixture, expectEventOnce, removeAndFlush, assertAccessible } from '../../test-utils.js';

import '../../../../swim-ui/src/components/section/index.js';

describe('swim-section', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-section', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-section');
  });

  it('reflects sectionCollapsed and sectionCollapsible', async () => {
    const el = await fixture<HTMLElement & { sectionCollapsed: boolean; sectionCollapsible: boolean }>('swim-section', {
      sectionCollapsed: true,
      sectionCollapsible: true
    });
    expect(el.sectionCollapsed).toBe(true);
    expect(el.sectionCollapsible).toBe(true);
  });

  it('accepts sectionTitle', async () => {
    const el = await fixture<HTMLElement & { sectionTitle: string }>('swim-section', {
      sectionTitle: 'Details'
    });
    expect(el.sectionTitle).toBe('Details');
  });

  it('has slot for content', async () => {
    const el = await fixture<HTMLElement>('swim-section', {});
    const slots = el.shadowRoot?.querySelectorAll('slot');
    expect(slots?.length).toBeGreaterThanOrEqual(1);
  });

  it('emits toggle exactly once when header is clicked (collapsible + headerToggle)', async () => {
    const el = await fixture<
      HTMLElement & { sectionCollapsible: boolean; headerToggle: boolean; sectionTitle: string }
    >('swim-section', {
      sectionCollapsible: true,
      headerToggle: true,
      sectionTitle: 'Title'
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    const header = el.shadowRoot?.querySelector('.swim-section__header');
    expect(header).toBeTruthy();
    await expectEventOnce(el, 'toggle', () => header!.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-section', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('is accessible: has focusable header when collapsible', async () => {
    const el = await fixture<HTMLElement & { sectionCollapsible: boolean }>('swim-section', {
      sectionCollapsible: true,
      sectionTitle: 'Section'
    });
    await (el as { updateComplete: Promise<void> }).updateComplete;
    assertAccessible(el, { focusable: true });
  });
});
