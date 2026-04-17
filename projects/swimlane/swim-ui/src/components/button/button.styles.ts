import { css } from 'lit';

/**
 * Button styles matching @swimlane/ngx-ui design system
 *
 * Variant appearance is driven by `--_swim-fallback-*` on :host (private).
 * Host-facing `--swim-button-*` always take precedence in the inner `button` rules.
 */
export const buttonStyles = css`
  :host {
    display: inline-block;
    cursor: pointer;

    /* Private fallbacks — overridden per [variant] with higher specificity */
    --_swim-fallback-bg: var(--grey-600);
    --_swim-fallback-hover-bg: var(--grey-700);
    --_swim-fallback-border-color: transparent;
    --_swim-fallback-hover-border-color: transparent;
    --_swim-fallback-color: var(--white);
    --_swim-fallback-hover-color: var(--white);
    --_swim-fallback-shadow: var(--shadow-1);
    --_swim-fallback-outline: var(--grey-600);

    /* Slotted nodes (e.g. swim-icon) inherit color from this host, not from the shadow button. */
    color: var(--swim-button-color, var(--_swim-fallback-color));
  }

  :host([variant='primary']:not([bordered])) {
    --_swim-fallback-bg: var(--blue-400);
    --_swim-fallback-hover-bg: var(--blue-500);
    --_swim-fallback-border-color: var(--blue-400);
    --_swim-fallback-hover-border-color: var(--blue-500);
    --_swim-fallback-color: var(--white);
    --_swim-fallback-hover-color: var(--white);
    --_swim-fallback-outline: var(--blue-500);
  }

  :host([variant='primary'][bordered]) {
    --_swim-fallback-bg: transparent;
    --_swim-fallback-hover-bg: var(--blue-500);
    --_swim-fallback-border-color: var(--blue-400);
    --_swim-fallback-hover-border-color: var(--blue-200);
    --_swim-fallback-color: var(--blue-400);
    --_swim-fallback-hover-color: var(--blue-200);
    --_swim-fallback-shadow: none;
    --_swim-fallback-outline: var(--blue-400);
  }

  :host([variant='bordered']) {
    --_swim-fallback-bg: transparent;
    --_swim-fallback-hover-bg: transparent;
    --_swim-fallback-border-color: var(--blue-400);
    --_swim-fallback-hover-border-color: var(--blue-200);
    --_swim-fallback-color: var(--blue-400);
    --_swim-fallback-hover-color: var(--blue-200);
    --_swim-fallback-shadow: none;
    --_swim-fallback-outline: var(--blue-400);
  }

  :host([variant='warning']) {
    --_swim-fallback-bg: var(--orange-400);
    --_swim-fallback-hover-bg: var(--orange-500);
    --_swim-fallback-border-color: transparent;
    --_swim-fallback-hover-border-color: transparent;
    --_swim-fallback-color: var(--grey-900);
    --_swim-fallback-hover-color: var(--grey-900);
    --_swim-fallback-outline: var(--orange-500);
  }

  :host([variant='danger']) {
    --_swim-fallback-bg: var(--red-400);
    --_swim-fallback-hover-bg: var(--red-500);
    --_swim-fallback-border-color: transparent;
    --_swim-fallback-hover-border-color: transparent;
    --_swim-fallback-color: var(--white);
    --_swim-fallback-hover-color: var(--white);
    --_swim-fallback-outline: var(--red-400);
  }

  :host([variant='link']) {
    --_swim-fallback-bg: transparent;
    --_swim-fallback-hover-bg: transparent;
    --_swim-fallback-border-color: transparent;
    --_swim-fallback-hover-border-color: transparent;
    --_swim-fallback-color: var(--white);
    --_swim-fallback-hover-color: var(--white);
    --_swim-fallback-shadow: none;
    --_swim-fallback-outline: var(--grey-600);
  }

  :host(:not([disabled]):hover) {
    color: var(--swim-button-hover-color, var(--_swim-fallback-hover-color));
  }

  :host([disabled]) {
    pointer-events: none;
    cursor: not-allowed;
  }

  :host([disabled]) button {
    opacity: 0.6;
    cursor: not-allowed;
  }

  button {
    box-sizing: border-box;
    color: var(--swim-button-color, var(--_swim-fallback-color));
    display: inline-grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    justify-items: stretch;
    align-items: center;
    padding: var(--swim-button-padding, 0.35em 0.55em);
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    font: inherit;
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-bold);
    outline: none;
    line-height: var(--font-line-height-100);
    outline-offset: 2px;
    cursor: inherit;
    width: 100%;

    background: var(--swim-button-background, var(--_swim-fallback-bg));
    border-width: var(--swim-button-border-width, 1px);
    border-style: var(--swim-button-border-style, solid);
    border-color: var(--swim-button-border-color, var(--_swim-fallback-border-color));
    border-radius: var(--radius-4);
    box-shadow: var(--swim-button-shadow, var(--_swim-fallback-shadow));
    transition: background-color 200ms, box-shadow 200ms;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.07);
  }

  button:focus,
  button:focus-within {
    outline: none;
  }

  button:focus-visible {
    outline: 2px solid var(--swim-button-outline-color, var(--_swim-fallback-outline));
  }

  /* One hover layer so generic grey hover never leaks into bordered / link / etc. */
  :host(:not([disabled])) button:hover {
    cursor: pointer;
    background: var(--swim-button-hover-background, var(--_swim-fallback-hover-bg));
    border-color: var(--swim-button-hover-border-color, var(--_swim-fallback-hover-border-color));
    color: var(--swim-button-hover-color, var(--_swim-fallback-hover-color));
    outline-color: var(
      --swim-button-hover-outline-color,
      var(--swim-button-hover-background, var(--_swim-fallback-hover-bg))
    );
  }

  /* Size variants */
  :host([size='small']) button {
    font-size: var(--font-size-xxs);
  }

  :host([size='large']) button {
    font-size: 1.3em;
  }

  /* Icon-only: slotted swim-icon uses 1em — inherit the button font-size for small/large parity */
  slot::slotted(swim-icon) {
    font-size: inherit;
  }

  /* Button content and state icon: same grid cell so intrinsic width is max(label, state) */
  .content {
    grid-area: 1 / 1;
    text-overflow: ellipsis;
    overflow-x: clip;
    overflow-y: visible;
    width: 100%;
    display: block;
    white-space: nowrap;
    transition: opacity 0.25s ease-out;
  }

  .state-icon {
    grid-area: 1 / 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    justify-self: center;
    width: max-content;
    box-sizing: border-box;
    opacity: 0;
    pointer-events: none;
  }

  .state-icon-group {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35em;
    box-sizing: border-box;
    padding: 0 0.35em;
  }

  .state-loading-text {
    white-space: nowrap;
  }

  /* State: In Progress */
  :host([state='in-progress']) {
    cursor: wait !important;
    position: relative;
    opacity: 1 !important;
  }

  :host([state='in-progress']) button {
    opacity: 1;
    pointer-events: none;
  }

  :host([state='in-progress']) .content {
    opacity: 0;
  }

  :host([state='in-progress']) .state-icon {
    opacity: 1;
  }

  /* State: Success */
  :host([state='success']) {
    cursor: wait !important;
  }

  :host([state='success']) button {
    color: black !important;
    background-color: var(--green-500) !important;
    background: var(--green-500) !important;
    border: 1px solid var(--green-500) !important;
    pointer-events: none;
  }

  :host([state='success']) .content {
    opacity: 0;
  }

  :host([state='success']) .state-icon {
    opacity: 1;
    color: var(--white);
  }

  /* State: Fail */
  :host([state='fail']) {
    cursor: wait !important;
  }

  :host([state='fail']) button {
    color: black !important;
    background-color: var(--red-500) !important;
    background: var(--red-500) !important;
    border: 1px solid var(--red-500) !important;
    pointer-events: none;
  }

  :host([state='fail']) .content {
    opacity: 0;
  }

  :host([state='fail']) .state-icon {
    opacity: 1;
    color: var(--white);
  }

  /* Icon styles */
  .icon {
    height: 1em;
    width: 1em;
    font-weight: var(--font-weight-bold);
    color: var(--white);
    overflow: hidden;
    font-size: var(--font-size-m);
    display: inline-block;
  }

  /* Spinner animation */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    animation: spin 1s linear infinite;
  }
`;
