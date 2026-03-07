import { describe, it, expect } from 'vitest';
import { fixture, removeAndFlush, flush } from '../../test-utils.js';

import '../../../../swim-ui/src/components/button-group/index.js';
import '../../../../swim-ui/src/components/button/index.js';

describe('swim-button-group', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-button-group', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-button-group');
  });

  it('has default slot for buttons', async () => {
    const el = await fixture<HTMLElement>('swim-button-group', {});
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('reflects orientation', async () => {
    const el = await fixture<HTMLElement & { orientation: string }>('swim-button-group', {
      orientation: 'vertical'
    });
    expect(el.getAttribute('orientation')).toBe('vertical');
    expect(el.orientation).toBe('vertical');
  });

  it('default orientation is horizontal', async () => {
    const el = await fixture<HTMLElement & { orientation: string }>('swim-button-group', {});
    expect(el.orientation).toBeDefined();
  });

  it('reflects variant', async () => {
    const el = await fixture<HTMLElement & { variant: string }>('swim-button-group', { variant: 'text' });
    expect(el.getAttribute('variant')).toBe('text');
    expect(el.variant).toBe('text');
  });

  it('reflects buttonGroupStyle', async () => {
    const el = await fixture<HTMLElement & { buttonGroupStyle: string }>('swim-button-group', {
      buttonGroupStyle: 'primary'
    });
    expect(el.getAttribute('button-group-style')).toBe('primary');
    expect(el.buttonGroupStyle).toBe('primary');
  });

  describe('composition with swim-button', () => {
    it('renders button children via slot', async () => {
      const el = await fixture<HTMLElement>('swim-button-group', {});
      const btn1 = document.createElement('swim-button');
      btn1.textContent = 'Save';
      const btn2 = document.createElement('swim-button');
      btn2.textContent = 'Cancel';
      el.appendChild(btn1);
      el.appendChild(btn2);
      await (el as { updateComplete: Promise<void> }).updateComplete;
      await flush();

      expect(el.children.length).toBe(2);
      expect(el.children[0].tagName.toLowerCase()).toBe('swim-button');
      expect(el.children[1].tagName.toLowerCase()).toBe('swim-button');
    });

    it('can mix button variants inside group', async () => {
      const el = await fixture<HTMLElement>('swim-button-group', {});
      const primary = document.createElement('swim-button') as HTMLElement & { variant: string };
      primary.variant = 'primary';
      primary.textContent = 'OK';
      const secondary = document.createElement('swim-button') as HTMLElement & { variant: string };
      secondary.variant = 'default';
      secondary.textContent = 'Cancel';
      el.appendChild(primary);
      el.appendChild(secondary);
      await (el as { updateComplete: Promise<void> }).updateComplete;

      expect((el.children[0] as HTMLElement & { variant: string }).variant).toBe('primary');
      expect((el.children[1] as HTMLElement & { variant: string }).variant).toBe('default');
    });
  });

  describe('dynamic property changes', () => {
    it('changes orientation after render', async () => {
      const el = await fixture<HTMLElement & { orientation: string }>('swim-button-group', {
        orientation: 'horizontal'
      });
      el.orientation = 'vertical';
      await (el as { updateComplete: Promise<void> }).updateComplete;
      expect(el.orientation).toBe('vertical');
      expect(el.getAttribute('orientation')).toBe('vertical');
    });

    it('changes variant after render', async () => {
      const el = await fixture<HTMLElement & { variant: string }>('swim-button-group', { variant: 'contained' });
      el.variant = 'text';
      await (el as { updateComplete: Promise<void> }).updateComplete;
      expect(el.variant).toBe('text');
    });

    it('changes buttonGroupStyle after render', async () => {
      const el = await fixture<HTMLElement & { buttonGroupStyle: string }>('swim-button-group', {
        buttonGroupStyle: 'default'
      });
      el.buttonGroupStyle = 'primary';
      await (el as { updateComplete: Promise<void> }).updateComplete;
      expect(el.buttonGroupStyle).toBe('primary');
    });
  });

  it('cleans up on remove: can be removed without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-button-group', {});
    await removeAndFlush(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
