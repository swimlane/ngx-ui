import { css } from 'lit';
import { baseStyles } from '../../styles/base';

const cardVerticalBodyPadding = 27;

/**
 * Card body styles for vertical layout. BEM: swim-card-body.
 */
export const cardBodyStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: var(--spacing-8);
    padding: var(--spacing-16) ${cardVerticalBodyPadding}px;
    box-sizing: border-box;
    overflow: auto;
    line-height: 1.5;
  }

  ::slotted(*) {
    width: 100%;
  }
`;

export const cardBodyComponentStyles = [baseStyles, cardBodyStyles];
