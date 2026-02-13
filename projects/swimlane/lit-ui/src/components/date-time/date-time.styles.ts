import { css } from 'lit';

/**
 * Date-time component styles matching @swimlane/ngx-ui design system.
 * Uses BEM naming: swim-date-time__element--modifier.
 */
export const dateTimeStyles = css`
  :host {
    position: relative;
    display: block;
    max-width: 100%;
  }

  :host([autosize]) {
    display: inline-block;
  }

  /* ------------------------------------------------------------------ */
  /* Container                                                          */
  /* ------------------------------------------------------------------ */

  .swim-date-time__container {
    position: relative;
  }

  /* Ensure the inner swim-input leaves space for the calendar button */
  .swim-date-time__container swim-input {
    --swim-input-padding-right: 28px;
  }

  /* Override swim-input display when host is autosize */
  :host([autosize]) .swim-date-time__container swim-input {
    display: inline-block;
  }

  /* ------------------------------------------------------------------ */
  /* Calendar / clock button                                            */
  /* ------------------------------------------------------------------ */

  .swim-date-time__calendar-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    padding: 0;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--grey-200);
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 2;
    font-size: 1rem;
    line-height: 1;
  }

  .swim-date-time__calendar-btn:hover {
    color: var(--grey-050);
  }

  .swim-date-time__calendar-btn:disabled {
    color: var(--grey-400);
    cursor: not-allowed;
    pointer-events: none;
  }

  .swim-date-time__calendar-btn:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
    border-radius: var(--radius-2);
  }

  /* No-label adjustment (button at top instead of center) */
  :host(:not([has-label])) .swim-date-time__calendar-btn {
    top: 0.5rem;
    transform: translateY(0);
  }

  /* Fill appearance */
  :host([appearance='fill']) .swim-date-time__calendar-btn {
    right: 10px;
  }

  /* Autosize: tweak vertical alignment */
  :host([autosize]) .swim-date-time__calendar-btn {
    transform: translateY(-25%);
  }

  :host([autosize][appearance='fill']) .swim-date-time__calendar-btn {
    transform: translateY(-15%);
  }

  :host([autosize][marginless]) .swim-date-time__calendar-btn {
    transform: translateY(-35%);
  }

  :host([autosize]:not([has-label])) .swim-date-time__calendar-btn {
    transform: translateY(0);
  }

  /* ------------------------------------------------------------------ */
  /* Hidden native picker (positioned off-screen but accessible)        */
  /* ------------------------------------------------------------------ */

  .swim-date-time__native-picker {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
    /* Place below the button so mobile sheet pickers still work */
    bottom: 0;
    right: 0;
  }

  /* ------------------------------------------------------------------ */
  /* Invalid / out-of-range state                                       */
  /* ------------------------------------------------------------------ */

  :host([date-invalid]) swim-input,
  :host([date-out-of-range]) swim-input {
    --swim-input-underline-color: var(--red-500);
    --swim-input-label-color: var(--red-500);
    --swim-input-hint-color: var(--red-500);
    --swim-input-caret-color: var(--red-500);
  }

  /* Force invalid styling on the inner input via attribute forwarding */
  :host([date-invalid]) swim-input,
  :host([date-out-of-range]) swim-input {
    color: inherit;
  }
`;
