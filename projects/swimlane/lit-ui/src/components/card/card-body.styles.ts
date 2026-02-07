import { css } from 'lit';
import { baseStyles } from '../../styles/base';

const cardVerticalGutter = 20;
const cardVerticalBodyPadding = 27;

/**
 * Card body styles for vertical layout. BEM: swim-card-body.
 */
export const cardBodyStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    padding: var(--spacing-20) var(--spacing-0);
    padding-left: ${cardVerticalBodyPadding}px;
    padding-right: ${cardVerticalBodyPadding}px;
    box-sizing: border-box;
  }

  ::slotted(*) {
    font-weight: var(--font-weight-semibold);
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
`;

export const cardBodyComponentStyles = [baseStyles, cardBodyStyles];
