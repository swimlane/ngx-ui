import { css } from 'lit';
import { baseStyles } from '../../styles/base';

const cardAccentThickness = 4;

/**
 * Card footer styles. BEM: swim-card-footer, swim-card-footer__label.
 */
export const cardFooterStyles = css`
  :host {
    position: relative;
    border-bottom: 2px solid var(--grey-700);
    height: 50px;
    padding: var(--spacing-20) var(--spacing-0);
    margin-bottom: ${cardAccentThickness}px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .swim-card-footer__label {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-xs);
    border-bottom: 0;
    white-space: nowrap;
    width: 100%;
    text-align: center;
    position: absolute;
    display: flex;
    align-items: center;
    top: -15px;
    left: 0;
  }

  .swim-card-footer__label::before,
  .swim-card-footer__label::after {
    content: '';
    height: 2px;
    background: var(--grey-700);
    width: 100%;
  }

  .swim-card-footer__label::before {
    margin-right: var(--spacing-20);
  }

  .swim-card-footer__label::after {
    margin-left: var(--spacing-20);
  }
`;

export const cardFooterComponentStyles = [baseStyles, cardFooterStyles];
