import { css } from 'lit';

const BAR_SIZE_PX = 40;
const BAR_THICKNESS_PX = 2;

/**
 * Navbar styles matching @swimlane/ngx-ui design system
 * Uses CSS variables from base styles (no hardcoded colors)
 */
export const navbarStyles = css`
  :host {
    --swim-navbar-bar-size: ${BAR_SIZE_PX}px;
    --swim-navbar-bar-thickness: ${BAR_THICKNESS_PX}px;
    display: inline-flex;
    align-items: center;
    min-height: 50px;
    position: relative;
    background-color: var(--grey-825);
    box-sizing: border-box;
  }

  .swim-navbar__nav-items {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .swim-navbar__bar-track {
    min-height: var(--swim-navbar-bar-thickness);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .swim-navbar__bar {
    position: absolute;
    width: var(--swim-navbar-bar-size);
    height: var(--swim-navbar-bar-thickness);
    background-color: var(--blue-500);
    transition: transform 300ms cubic-bezier(0.35, 0, 0.25, 1);
  }

  .swim-navbar__bar--bottom {
    bottom: 0;
  }

  .swim-navbar__bar--top {
    top: 0;
  }

  :host([bar-at-top]) .swim-navbar__bar-track {
    top: 0;
    bottom: auto;
  }
`;
