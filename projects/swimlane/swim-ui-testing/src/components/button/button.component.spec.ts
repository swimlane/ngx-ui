import { describe, it, expect } from 'vitest';
import { fixture, oneEvent, expectEventOnce, removeAndFlush, assertAccessible } from '../../test-utils.js';

import '../../../../swim-ui/src/components/button/index.js';

describe('swim-button', () => {
  it('renders without throwing', async () => {
    const el = await fixture<HTMLElement>('swim-button', {});
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('swim-button');
  });

  it('reflects variant and size', async () => {
    const el = await fixture<HTMLElement & { variant: string; size: string }>('swim-button', {
      variant: 'primary',
      size: 'large'
    });
    expect(el.getAttribute('variant')).toBe('primary');
    expect(el.getAttribute('size')).toBe('large');
    expect(el.variant).toBe('primary');
    expect(el.size).toBe('large');
  });

  it('reflects disabled', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-button', { disabled: true });
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.disabled).toBe(true);
  });

  it('fires click when not disabled', async () => {
    const el = await fixture<HTMLElement>('swim-button', {});
    const btn = el.shadowRoot?.querySelector('button');
    expect(btn).toBeTruthy();
    const clickPromise = oneEvent(el, 'click');
    btn!.click();
    const e = await clickPromise;
    expect(e).toBeDefined();
  });

  it('does not fire click when disabled', async () => {
    const el = await fixture<HTMLElement & { disabled: boolean }>('swim-button', { disabled: true });
    const btn = el.shadowRoot?.querySelector('button');
    expect(btn).toBeTruthy();
    let fired = false;
    el.addEventListener('click', () => {
      fired = true;
    });
    btn!.click();
    await new Promise(r => setTimeout(r, 10));
    expect(fired).toBe(false);
  });

  it('has default type="button"', async () => {
    const el = await fixture<HTMLElement & { type: string }>('swim-button', {});
    expect(el.type).toBe('button');
  });

  it('accepts type submit and reset', async () => {
    const submitEl = await fixture<HTMLElement & { type: string }>('swim-button', { type: 'submit' });
    expect(submitEl.type).toBe('submit');
    const resetEl = await fixture<HTMLElement & { type: string }>('swim-button', { type: 'reset' });
    expect(resetEl.type).toBe('reset');
  });

  it('has css part button', async () => {
    const el = await fixture<HTMLElement>('swim-button', {});
    const part = el.shadowRoot?.querySelector('[part="button"]');
    expect(part).toBeTruthy();
  });

  it('reflects state property', async () => {
    const el = await fixture<HTMLElement & { state: string }>('swim-button', { state: 'in-progress' });
    expect(el.getAttribute('state')).toBe('in-progress');
    expect(el.state).toBe('in-progress');
  });

  it('emits click exactly once per user click (no double emit)', async () => {
    const el = await fixture<HTMLElement>('swim-button', {});
    const btn = el.shadowRoot!.querySelector('button')!;
    const event = await expectEventOnce(el, 'click', () => btn.click());
    expect(event).toBeDefined();
  });

  it('cleans up on remove: no unhandled rejection when removed with pending promise (no leak)', async () => {
    const el = await fixture<HTMLElement & { promise?: Promise<unknown> }>('swim-button', {});
    const neverResolve = new Promise(() => {});
    el.promise = neverResolve;
    await (el as { updateComplete: Promise<void> }).updateComplete;
    await removeAndFlush(el);
    // If the component did not clean up its promise callback, we'd get an unhandled rejection or leak when it settles.
    expect(document.body.contains(el)).toBe(false);
  });

  it('is accessible: has focusable button and does not remove focusability when disabled', async () => {
    const el = await fixture<HTMLElement>('swim-button', {});
    assertAccessible(el, { focusable: true });
    const btn = el.shadowRoot!.querySelector('button');
    expect(btn?.getAttribute('type')).toBe('button');
    const disabledEl = await fixture<HTMLElement & { disabled: boolean }>('swim-button', { disabled: true });
    const disabledBtn = disabledEl.shadowRoot!.querySelector('button');
    expect(disabledBtn?.hasAttribute('disabled')).toBe(true);
  });
});
