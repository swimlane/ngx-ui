import { css } from 'lit';
import { baseStyles } from '../../styles/base';

/**
 * Card placeholder (skeleton) styles. BEM: swim-card-placeholder, --small, --medium, --large.
 */
export const cardPlaceholderStyles = css`
  :host {
    display: inline-block;
    background-color: var(--grey-700);
    border-radius: 11px;
    box-sizing: border-box;
  }

  :host([size='small']) {
    height: 10px;
    width: 35%;
  }

  :host([size='medium']) {
    height: 12px;
    width: 30%;
  }

  :host([size='large']) {
    height: 16px;
    width: 50%;
  }
`;

export const cardPlaceholderComponentStyles = [baseStyles, cardPlaceholderStyles];
