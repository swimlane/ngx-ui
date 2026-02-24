import { css } from 'lit';
import { baseStyles } from '../../styles/base';

/**
 * Card placeholder (skeleton) styles. BEM: swim-card-placeholder, --small, --medium, --large.
 */
export const cardPlaceholderStyles = css`
  :host {
    display: inline-block;
    background-color: var(--grey-750);
    border-radius: 11px;
    box-sizing: border-box;
    vertical-align: middle;
  }

  :host([size='small']) {
    height: 10px;
    width: 35%;
    min-width: 80px;
  }

  :host([size='medium']) {
    height: 12px;
    width: 30%;
    min-width: 100px;
  }

  :host([size='large']) {
    height: 16px;
    width: 50%;
    min-width: 150px;
  }
`;

export const cardPlaceholderComponentStyles = [baseStyles, cardPlaceholderStyles];
