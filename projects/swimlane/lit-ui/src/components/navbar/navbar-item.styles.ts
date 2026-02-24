import { css } from 'lit';

/**
 * Navbar item styles matching @swimlane/ngx-ui design system
 * Uses CSS variables from base styles (no hardcoded colors)
 */
export const navbarItemStyles = css`
  :host {
    display: flex;
    font-size: var(--font-size-xl);
    color: var(--grey-400);
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    padding: var(--spacing-8) 10px var(--spacing-0) 10px;
    box-sizing: border-box;
  }

  :host(:focus) {
    outline: none;
  }

  :host(:focus-visible) {
    outline: 2px solid var(--blue-400);
    outline-offset: 2px;
    border-radius: var(--radius-2);
  }

  :host(:hover),
  :host(.swim-navbar-item--active) {
    color: var(--blue-400);
  }
`;
