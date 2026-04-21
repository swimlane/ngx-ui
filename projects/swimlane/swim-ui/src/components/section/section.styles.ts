import { css } from 'lit';
import { baseStyles } from '../../styles/base';

/**
 * Section component styles matching @swimlane/ngx-ui design system.
 * BEM: swim-section (block), swim-section__header, swim-section__toggle, swim-section__content.
 * Uses CSS variables from base; no hardcoded colors.
 *
 * Host-facing overrides (optional): `--swim-section-background`, `--swim-section-header-background`,
 * `--swim-section-header-hover-background` (full header row on hover when collapsible UI exists: `header-toggle` or
 *   chevron toggle; omitted when there is no toggle control),
 * `--swim-section-content-background`.
 * Private `--_swim-fallback-*` on :host are reset per `[appearance]`; public vars always win in the rules.
 *
 * Note: Lit css`` only allows literal values or other css`` results; do not interpolate plain strings.
 */
export const sectionStyles = css`
  :host {
    display: block;
    width: 100%;
    margin-bottom: 2em;
    box-sizing: border-box;

    --_swim-fallback-background: var(--grey-825);
    --_swim-fallback-header-background: var(--grey-775);
    --_swim-fallback-header-hover-background: var(--grey-750);
    --_swim-fallback-content-background: transparent;

    background: var(--swim-section-background, var(--_swim-fallback-background));
    border-radius: var(--radius-8);
  }

  :host([appearance='minimal']) {
    --_swim-fallback-background: transparent;
    --_swim-fallback-header-background: transparent;
    --_swim-fallback-header-hover-background: transparent;
    --_swim-fallback-content-background: transparent;
  }

  :host([appearance='outline']) {
    --_swim-fallback-header-background: transparent;
    --_swim-fallback-header-hover-background: var(--grey-750);
    --_swim-fallback-content-background: transparent;
  }

  :host([appearance='light']) {
    --_swim-fallback-header-background: var(--grey-700);
    --_swim-fallback-header-hover-background: var(--grey-725);
    --_swim-fallback-content-background: var(--grey-775);
  }

  .swim-section__inner {
    display: block;
    width: 100%;
  }

  .swim-section__header {
    background: var(--swim-section-header-background, var(--_swim-fallback-header-background));
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 0;
    min-height: 44px;
    height: auto;
    line-height: 1.25;
    padding: var(--spacing-8) var(--spacing-10);
    color: var(--grey-100);
    position: relative;
    border-radius: var(--radius-8) var(--radius-8) var(--radius-0) var(--radius-0);
    box-sizing: border-box;
    overflow: hidden;
  }

  .swim-section__header-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    gap: var(--spacing-16);
  }

  /* When toggle is shown (left), reserve space so title isn’t cut off */
  .swim-section__header--collapsible:not(.swim-section__header--toggle-right) .swim-section__header-content {
    padding-left: 28px;
  }

  .swim-section__header-content slot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    min-width: 0;
    gap: var(--spacing-16);
  }

  /* Custom header (e.g. swim-section-header): full-width row so title and link sit at start/end */
  .swim-section__header-content ::slotted(swim-section-header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-width: 0;
    gap: var(--spacing-16);
  }

  /* Slotted headings match section title: same size/weight, no extra margin */
  .swim-section__header-content ::slotted(h1),
  .swim-section__header-content ::slotted(h2),
  .swim-section__header-content ::slotted(h3),
  .swim-section__header-content ::slotted(h4) {
    margin: 0;
    padding: 0;
    font-size: var(--font-size-m);
    font-weight: 400;
    line-height: 1.25;
  }

  .swim-section__header-content ::slotted(a) {
    flex-shrink: 0;
  }

  .swim-section__header.swim-section__header--collapsed {
    border-radius: var(--radius-8);
  }

  .swim-section__toggle {
    position: absolute;
    left: 0;
    top: 0;
    width: 28px;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    box-shadow: none;
    cursor: pointer;
    color: var(--grey-100);
    overflow: hidden; /* avoid chevron glyph artifacts */
  }

  .swim-section__toggle:focus-visible {
    outline: 2px solid var(--blue-200);
    outline-offset: -2px;
    border-radius: var(--radius-2);
    z-index: 1;
  }

  .swim-section__toggle-icon {
    font-size: var(--font-size-xs);
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swim-section__toggle swim-icon {
    display: block;
    font-size: var(--font-size-xs);
  }

  .swim-section__header a {
    color: var(--grey-100);
    text-decoration: none;
  }

  .swim-section__header a:hover,
  .swim-section__header a:focus {
    text-decoration: underline;
  }

  .swim-section__header a:visited {
    color: var(--grey-100);
  }

  .swim-section__header-title {
    font-size: var(--font-size-m);
    font-weight: 400;
    line-height: 1.25;
    padding: var(--spacing-0);
    margin: var(--spacing-0);
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .swim-section__header.swim-section__header--collapsible:not(.swim-section__header--toggle-right) {
    padding-left: 0; /* space for toggle is from header-content padding-left */
  }

  .swim-section__header.swim-section__header--collapsible:not(.swim-section__header--empty) {
    transition: background-color 200ms ease;
  }

  /* Full-row hover when user can collapse via header click or chevron (not when collapsible but no UI control) */
  .swim-section__header.swim-section__header--collapsible:hover:not(.swim-section__header--empty):is(.swim-section__header--header-toggle, :has(.swim-section__toggle)) {
    background: var(--swim-section-header-hover-background, var(--_swim-fallback-header-hover-background));
  }

  .swim-section__header.swim-section__header--header-toggle {
    cursor: pointer;
  }

  .swim-section__header.swim-section__header--header-toggle:focus-visible {
    outline: 2px solid var(--blue-200);
    border-radius: var(--radius-2);
    outline-offset: 1px;
  }

  .swim-section__header.swim-section__header--toggle-right.swim-section__header--collapsible {
    padding: var(--spacing-0) var(--spacing-20) var(--spacing-0) var(--spacing-16);
  }

  .swim-section__header.swim-section__header--toggle-right .swim-section__toggle {
    left: auto;
    right: 0;
    width: 28px;
  }

  .swim-section__header--empty {
    height: 0;
    min-height: 0;
    padding: 0;
    overflow: hidden;
    border: none;
    border-radius: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }

  .swim-section__content {
    display: block;
    box-sizing: border-box;
    background: var(--swim-section-content-background, var(--_swim-fallback-content-background));
  }

  /* Appearance: outline */
  :host([appearance='outline']) .swim-section__header,
  :host([appearance='outline']) .swim-section__content {
    border: 1px solid var(--grey-600);
  }

  :host([appearance='outline']) .swim-section__header {
    border-radius: var(--radius-8) var(--radius-8) var(--radius-0) var(--radius-0);
  }

  :host([appearance='outline']) .swim-section__header.swim-section__header--collapsed {
    border-radius: var(--radius-8);
  }

  :host([appearance='outline']) .swim-section__content {
    border-top: 0;
    border-radius: var(--radius-0) var(--radius-0) var(--radius-8) var(--radius-8);
  }

  /* Appearance: light */
  :host([appearance='light']) .swim-section__header,
  :host([appearance='light']) .swim-section__content {
    border: 2px solid var(--grey-700);
  }

  :host([appearance='light']) .swim-section__header {
    border-radius: var(--radius-8) var(--radius-8) var(--radius-0) var(--radius-0);
  }

  :host([appearance='light']) .swim-section__header.swim-section__header--collapsed {
    border-radius: var(--radius-8);
  }

  :host([appearance='light']) .swim-section__content {
    border-radius: var(--radius-0) var(--radius-0) var(--radius-8) var(--radius-8);
  }
`;

export const sectionComponentStyles = [baseStyles, sectionStyles];
