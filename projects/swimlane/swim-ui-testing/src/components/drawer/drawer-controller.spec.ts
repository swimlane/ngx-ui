import { describe, it, expect } from 'vitest';
import { oneEvent } from '../../test-utils.js';

import { openDrawer } from '../../../../swim-ui/src/components/drawer/drawer-controller.js';

describe('openDrawer', () => {
  it('returns close and drawer', () => {
    const result = openDrawer({ content: 'Test' });
    expect(result).toHaveProperty('close');
    expect(result).toHaveProperty('drawer');
    expect(typeof result.close).toBe('function');
    expect(result.drawer.tagName.toLowerCase()).toBe('swim-drawer');
    result.close();
  });

  it('accepts options and renders content', () => {
    const result = openDrawer({
      direction: 'right',
      size: 250,
      content: '<p>Hello</p>'
    });
    expect(result.drawer.direction).toBe('right');
    expect(result.drawer.size).toBe(250);
    expect(result.drawer.childNodes.length).toBeGreaterThanOrEqual(1);
    result.close();
  });

  it('close() removes drawer from DOM', async () => {
    const result = openDrawer({ content: 'x' });
    const drawer = result.drawer;
    expect(document.body.contains(drawer)).toBe(true);
    const closePromise = oneEvent(drawer, 'close');
    result.close();
    await closePromise;
    expect(document.body.contains(drawer)).toBe(false);
  });
});
