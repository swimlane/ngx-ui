import { css } from 'lit';

/**
 * Styles for swim-date-display (read-only date/time presentation, ngx-time parity).
 */
export const dateDisplayStyles = css`
  :host {
    display: inline;
    vertical-align: baseline;
  }

  .swim-date-display__root {
    display: inline;
  }

  .swim-date-display__time {
    display: inline;
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
    border: none;
    background: transparent;
    text-align: inherit;
  }

  :host([invalid]) .swim-date-display__time {
    color: var(--red-500);
  }

  .swim-date-display__time--popup {
    text-decoration-line: underline;
    text-decoration-style: dashed;
    text-decoration-thickness: from-font;
    cursor: copy;
    color: inherit;
  }

  .swim-date-display__time--clickable {
    cursor: pointer;
  }

  .swim-date-display__time--clickable:active {
    transform: translate(1px, 1px);
    color: var(--grey-600);
  }

  .swim-date-display__time--clickable:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
    border-radius: var(--radius-2);
  }

  swim-tooltip {
    display: inline;
  }

  /* Tooltip panel content (swim-tooltip exposes part="content") */
  swim-tooltip::part(content) {
    padding: var(--spacing-2);
  }

  .swim-date-display__zone-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-2);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-m);
    color: var(--grey-800);
    margin-bottom: var(--spacing-2);
  }

  .swim-date-display__zone-row:last-child {
    margin-bottom: 0;
  }

  .swim-date-display__zone-label {
    flex: 1 1 auto;
    min-width: 0;
  }

  .swim-date-display__copy-btn {
    flex: 0 0 auto;
    text-transform: uppercase;
    font-size: var(--font-size-xs);
    line-height: 1.25;
    min-width: 4.5rem;
    width: 30px;
    --swim-button-background: var(--grey-200);
    --swim-button-hover-background: var(--white);
    --swim-button-border-color: var(--grey-400);
    --swim-button-hover-border-color: var(--grey-350);
    --swim-button-color: var(--grey-700);
    --swim-button-hover-color: var(--grey-800);
    --swim-button-outline-color: var(--blue-500);
    --swim-button-hover-outline-color: var(--blue-500);
    --swim-button-shadow: none;
  }
`;
