import { css } from 'lit';

/**
 * Tab panel styles – content area for swim-tab
 */
export const tabStyles = css`
  :host {
    display: block;
  }

  .swim-tab__panel {
    display: block;
  }

  .swim-tab__panel[hidden] {
    display: none;
  }
`;
