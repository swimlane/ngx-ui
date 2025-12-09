import { css } from 'lit';

/**
 * Select styles matching @swimlane/ngx-ui design system
 */
export const selectStyles = css`
  :host {
    display: block;
    max-width: 100%;
    margin-top: var(--spacing-16);
    margin-bottom: var(--spacing-8);
    line-height: calc(1em + 0.75em);
    padding-top: calc(0.75rem + 8px);
    padding-bottom: 0;
    position: relative;
    min-width: 300px;
  }

  :host([marginless]) {
    margin-top: 0;
    margin-bottom: 0;
  }

  :host([no-label]) {
    padding-top: 0;
  }

  :host([size='md']) .select-input {
    font-size: var(--font-size-l) !important;
  }

  :host([size='lg']) .select-input {
    font-size: var(--font-size-xl) !important;
  }

  :host([focused]:not([invalid])) .select-label {
    color: var(--blue-500) !important;
  }

  :host([invalid][touched]) .select-underline {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]) .underline-fill {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]) .select-label,
  :host([invalid][touched]) .select-hint {
    color: var(--red-500);
  }

  .select-wrap {
    position: relative;
    display: block;
    margin-bottom: 0;
    width: 100%;
  }

  .select-flex-wrap {
    display: flex;
    flex-direction: row;
  }

  .select-flex-wrap-inner {
    display: flex;
    flex: 100%;
    width: 100%;
    position: relative;
  }

  .select-input-wrap {
    width: 100%;
    position: relative;
  }

  .select-input {
    align-items: center;
    position: relative;
    background: transparent;
    outline: none;
    margin-bottom: 0;
    padding-left: 0;
    width: 100%;
    min-height: var(--input-height, 33px);
    min-width: 60px;
    cursor: pointer;
    display: flex;
    border: none;
    color: var(--grey-050);
    font-size: var(--font-size-m);
    font-family: inherit;
  }

  .select-input:focus {
    outline: none;
  }

  .select-input[disabled] {
    cursor: not-allowed;
    color: var(--grey-400);
  }

  .select-value {
    flex: 1;
    padding: 3px 0;
    min-height: 1.4em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .select-placeholder {
    color: var(--grey-350);
  }

  .select-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    padding-right: var(--spacing-4);
    color: var(--grey-350);
  }

  .select-clear,
  .select-caret {
    background: none;
    border: none;
    padding: var(--spacing-2);
    cursor: pointer;
    color: inherit;
    font-size: var(--font-size-xxs);
    display: flex;
    align-items: center;
    transition: color 100ms;
  }

  .select-clear:hover,
  .select-caret:hover {
    color: var(--blue-400);
  }

  .select-caret {
    transition: transform 200ms ease-in-out;
    transform: rotate(0deg);
  }

  :host([open]) .select-caret {
    transform: rotate(180deg);
  }

  .select-label {
    position: absolute;
    top: 0.5em;
    line-height: var(--font-line-height-100);
    pointer-events: none;
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-semibold);
    color: var(--grey-350);
    white-space: nowrap;
    overflow-x: clip;
    max-width: 100%;
    text-overflow: ellipsis;
    transition: color 0.2s ease-out, font-size 150ms ease-out, top 150ms ease-out;
  }

  :host([active]) .select-label,
  :host([has-placeholder]) .select-label {
    font-size: 0.75rem;
    top: -1.4em;
  }

  .select-underline {
    width: 100%;
    height: 1px;
    background-color: var(--grey-600);
  }

  .underline-fill {
    background-color: var(--blue-500);
    transition: width 250ms ease-out;
    width: 0;
    height: 2px;
    margin: 0 auto;
  }

  :host([focused]) .underline-fill,
  :host([open]) .underline-fill {
    width: 100%;
  }

  .select-hint {
    font-size: var(--font-size-xs);
    color: var(--grey-350);
    margin-top: var(--spacing-8);
    min-height: 1em;
    line-height: 14px;
    transition: color 0.2s ease-in-out;
  }

  .select-hint.hidden {
    display: none;
  }

  /* Dropdown */
  .select-dropdown {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1000;
    background: var(--grey-700);
    border: 1px solid transparent;
    border-radius: var(--radius-4);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: var(--spacing-8);
    max-height: 300px;
    overflow-y: auto;
    display: none;
  }

  :host([open]) .select-dropdown {
    display: block;
    animation: slideDown 0.25s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .select-filter {
    padding: var(--spacing-10);
    background: var(--grey-600);
    position: sticky;
    top: 0;
    z-index: 1;
    border-top-left-radius: var(--radius-4);
    border-top-right-radius: var(--radius-4);
  }

  .select-filter-input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: var(--grey-050);
    font-size: var(--font-size-m);
    font-family: inherit;
    padding: var(--spacing-4);
  }

  .select-filter-input::placeholder {
    color: var(--grey-350);
  }

  .select-options {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .select-option {
    padding: 7px 15px;
    font-size: var(--font-size-m);
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--grey-050);
    transition: background-color 100ms;
  }

  .select-option:not(:last-child) {
    border-bottom: 1px solid var(--grey-650);
  }

  .select-option:hover:not([disabled]) {
    background: var(--grey-750);
  }

  .select-option[selected] {
    background: var(--blue-600);
    color: var(--white);
  }

  .select-option[disabled] {
    color: var(--grey-450);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .select-option[focused]:not([disabled]) {
    background: var(--grey-725);
  }

  .select-empty {
    padding: 7px 15px;
    font-size: var(--font-size-m);
    color: var(--grey-300);
    font-style: italic;
  }

  /* Multiple selection */
  :host([multiple]) .select-value {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
  }

  .select-chip {
    background: var(--grey-600);
    color: var(--white);
    border-radius: var(--radius-2);
    padding: 0 0.5em;
    font-size: var(--font-size-m);
    line-height: 1.4em;
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-4);
    white-space: nowrap;
    max-width: 200px;
  }

  .select-chip-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .select-chip-remove {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--grey-350);
    font-size: 0.5em;
    line-height: 1;
    transition: color 100ms;
  }

  .select-chip-remove:hover {
    color: var(--white);
  }

  /* Fill appearance */
  :host([appearance='fill']) .select-flex-wrap {
    position: relative;
  }

  :host([appearance='fill']) .select-flex-wrap::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--grey-875);
    mix-blend-mode: exclusion;
    pointer-events: none;
    border-top-left-radius: var(--radius-4);
    border-top-right-radius: var(--radius-4);
  }

  :host([appearance='fill']) .select-input {
    padding: var(--spacing-4) 10px;
    position: relative;
    z-index: 1;
  }

  :host([appearance='fill']) .select-label {
    left: 0;
  }

  /* Icon styles */
  .icon-chevron-down::before {
    content: '▼';
  }

  .icon-x::before {
    content: '✕';
  }
`;





