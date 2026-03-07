/**
 * Create a custom element, set properties, append to body, and return after updateComplete.
 * Ensure the component is imported (so customElements.define has run) before calling.
 */
export async function fixture<T extends HTMLElement>(tag: string, props: Record<string, unknown> = {}): Promise<T> {
  const element = document.createElement(tag) as T;
  for (const [key, value] of Object.entries(props)) {
    (element as Record<string, unknown>)[key] = value;
  }
  document.body.appendChild(element);
  await waitForUpdate(element);
  return element;
}

/**
 * Wait for a Lit element's updateComplete (safe for any HTMLElement).
 */
export async function waitForUpdate(el: HTMLElement): Promise<void> {
  const lit = el as unknown as { updateComplete?: Promise<void> };
  if (typeof lit.updateComplete?.then === 'function') await lit.updateComplete;
}

/**
 * Wait for one event on an element.
 */
export function oneEvent(el: EventTarget, eventName: string): Promise<Event> {
  return new Promise(resolve => {
    el.addEventListener(eventName, resolve, { once: true });
  });
}

/**
 * Flush async updates (requestAnimationFrame + updateComplete).
 */
export async function flush(): Promise<void> {
  await new Promise(r => requestAnimationFrame(r));
  await new Promise(r => requestAnimationFrame(r));
}

/**
 * Create a form with the given element as child; return form and element for form association tests.
 */
export function createFormWithControl(
  controlTag: string,
  controlProps: Record<string, unknown> & { name?: string } = {}
): { form: HTMLFormElement; control: HTMLElement } {
  const form = document.createElement('form');
  const control = document.createElement(controlTag) as HTMLElement & Record<string, unknown>;
  for (const [key, value] of Object.entries(controlProps)) {
    control[key] = value;
  }
  form.appendChild(control);
  document.body.appendChild(form);
  return { form, control };
}

/**
 * Assert that an event fires exactly once when trigger is run (no double emit).
 * Triggers, waits a short window, then asserts exactly one event was received.
 */
export async function expectEventOnce(
  el: EventTarget,
  eventName: string,
  trigger: () => void,
  options: { timeoutMs?: number } = {}
): Promise<Event> {
  const { timeoutMs = 50 } = options;
  const events: Event[] = [];
  const listener = (e: Event) => events.push(e);
  el.addEventListener(eventName, listener);
  trigger();
  await new Promise(r => setTimeout(r, timeoutMs));
  el.removeEventListener(eventName, listener);
  if (events.length !== 1) {
    throw new Error(`Expected exactly 1 "${eventName}" event, got ${events.length}`);
  }
  return events[0];
}

/**
 * Remove element from DOM and wait a tick (for cleanup of timers/listeners).
 * Use to verify components don't throw or leave dangling work after removal.
 */
export async function removeAndFlush(el: HTMLElement): Promise<void> {
  el.remove();
  await flush();
  await new Promise(r => setTimeout(r, 0));
}

export interface AssertNoEventAfterDestroyOptions {
  /** Ms to wait after removing the element before triggering the global action. Default 20. */
  waitAfterDestroyMs?: number;
  /** Ms to wait after triggering the global action before asserting. Default 50. */
  waitAfterTriggerMs?: number;
}

/**
 * Asserts that after the element is removed from DOM, triggering a global action
 * (e.g. document keydown, window resize) does NOT cause the element to emit the given event.
 * Proves the component cleaned up its global listeners (no memory leak).
 *
 * Pattern: emulate element → listen to its event → destroy → trigger global action → assert event did not fire.
 */
export async function assertNoEventAfterDestroy(
  el: HTMLElement,
  eventName: string,
  triggerGlobalAction: () => void,
  options: AssertNoEventAfterDestroyOptions = {}
): Promise<void> {
  const { waitAfterDestroyMs = 20, waitAfterTriggerMs = 50 } = options;
  const eventsAfterDestroy: Event[] = [];
  const listener = (e: Event) => eventsAfterDestroy.push(e);
  el.addEventListener(eventName, listener);
  el.remove();
  await flush();
  await new Promise(r => setTimeout(r, waitAfterDestroyMs));
  triggerGlobalAction();
  await new Promise(r => setTimeout(r, waitAfterTriggerMs));
  el.removeEventListener(eventName, listener);
  if (eventsAfterDestroy.length > 0) {
    throw new Error(
      `Expected no "${eventName}" after destroy (cleanup), but received ${eventsAfterDestroy.length} — possible listener leak`
    );
  }
}

/**
 * Find first element in tree (el + shadow + light children) matching a predicate.
 */
function findInTree(el: HTMLElement, pred: (n: Element) => boolean): Element | null {
  if (pred(el)) return el;
  const shadow = el.shadowRoot;
  if (shadow) {
    for (const child of shadow.querySelectorAll('*')) {
      if (pred(child)) return child;
    }
  }
  for (const child of el.querySelectorAll('*')) {
    if (pred(child)) return child;
  }
  return null;
}

/**
 * Assert basic accessibility: role and optional aria attributes on the element or a descendant.
 * Checks host first, then shadow DOM, then light DOM. Does not run axe.
 */
export function assertAccessible(
  el: HTMLElement,
  options: {
    role?: string;
    ariaLabel?: string;
    ariaChecked?: boolean;
    ariaExpanded?: boolean;
    ariaModal?: boolean;
    /** Expect at least one focusable descendant (button, input, or tabindex >= 0) */
    focusable?: boolean;
  }
): void {
  const getElWithAttr = (attr: string) =>
    (el.hasAttribute(attr) ? el : findInTree(el, n => n.hasAttribute(attr))) as Element | null;

  if (options.role !== undefined) {
    const withRole =
      el.getAttribute('role') === options.role ? el : findInTree(el, n => n.getAttribute('role') === options.role);
    if (!withRole) throw new Error(`Expected role="${options.role}" on or inside element`);
  }
  if (options.ariaLabel !== undefined) {
    const node = getElWithAttr('aria-label');
    const label = node?.getAttribute('aria-label') ?? null;
    if (label !== options.ariaLabel) throw new Error(`Expected aria-label="${options.ariaLabel}", got "${label}"`);
  }
  if (options.ariaChecked !== undefined) {
    const node = getElWithAttr('aria-checked');
    const checked = node?.getAttribute('aria-checked');
    if (checked !== null && checked !== String(options.ariaChecked))
      throw new Error(`Expected aria-checked="${options.ariaChecked}", got "${checked}"`);
  }
  if (options.ariaExpanded !== undefined) {
    const node = getElWithAttr('aria-expanded');
    const expanded = node?.getAttribute('aria-expanded');
    if (expanded !== null && expanded !== String(options.ariaExpanded))
      throw new Error(`Expected aria-expanded="${options.ariaExpanded}", got "${expanded}"`);
  }
  if (options.ariaModal !== undefined) {
    const node = getElWithAttr('aria-modal');
    const modal = node?.getAttribute('aria-modal');
    if (modal !== null && modal !== String(options.ariaModal))
      throw new Error(`Expected aria-modal="${options.ariaModal}", got "${modal}"`);
  }
  if (options.focusable === true) {
    const focusable =
      el.shadowRoot?.querySelector?.('button, input, textarea, [tabindex="0"], [tabindex]:not([tabindex="-1"])') ??
      el.querySelector?.('button, input, textarea, [tabindex="0"]');
    if (!focusable) throw new Error('Expected a focusable descendant (button, input, or tabindex=0)');
  }
}

// Use Vitest's built-in expect (globals: true in vitest.config)
