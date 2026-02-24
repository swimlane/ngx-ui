import { css } from 'lit';
import { baseStyles } from '../../styles/base';

/**
 * Progress spinner styles matching @swimlane/ngx-ui design system.
 * Uses CSS variables for colors (--blue-500, --red-500) and BEM naming.
 */
export const progressSpinnerStyles = css`
  ${baseStyles}

  @keyframes swim-progress-spinner--rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .swim-progress-spinner__container {
    display: inline-flex;
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 0 10px 0 var(--spinner-color);
    position: relative;
  }

  .swim-progress-spinner__svg {
    display: block;
  }

  .swim-progress-spinner__circle {
    fill: transparent;
    transition: 0.1s stroke-dashoffset;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    stroke: var(--spinner-color);
  }

  .swim-progress-spinner__icon-in-progress,
  .swim-progress-spinner__icon-complete,
  .swim-progress-spinner__icon-failure {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  /* Size and color for slotted or property-driven swim-icon in center */
  .swim-progress-spinner__icon-in-progress swim-icon,
  .swim-progress-spinner__icon-complete swim-icon,
  .swim-progress-spinner__icon-failure swim-icon {
    font-size: var(--font-size-5xl);
    color: var(--spinner-color);
  }

  .swim-progress-spinner__icon-failure swim-icon {
    color: var(--color-error, var(--red-500));
  }

  .swim-progress-spinner__label {
    margin-top: var(--spacing-24, 24px);
  }

  .swim-progress-spinner__label h4 {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-2xl);
    line-height: 30px;
    text-align: center;
    color: var(--white);
    margin: 0;
  }

  /* Indeterminate: rotating circle */
  :host([mode='indeterminate']) .swim-progress-spinner__circle {
    animation: swim-progress-spinner--rotate 1s linear infinite;
  }
`;
