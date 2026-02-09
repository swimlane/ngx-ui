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

  @keyframes swim-progress-spinner--check {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
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

  .swim-progress-spinner__upload-icon,
  .swim-progress-spinner__thumbs-up-icon,
  .swim-progress-spinner__thumbs-down-icon {
    display: none;
  }

  .swim-progress-spinner__icon-in-progress,
  .swim-progress-spinner__icon-complete,
  .swim-progress-spinner__icon-failure {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

  /* Icon appearance: show built-in icons when not using slots */
  :host([appearance='icon']) .swim-progress-spinner__upload-icon {
    display: block;
    transform: translate(calc(50% - 18.735px), calc(50% - 26.5px));
    fill: var(--spinner-color);
  }

  :host([appearance='icon']) .swim-progress-spinner__thumbs-up-icon {
    display: block;
    transform: translate(calc(50% - 35px), calc(50% - 36px));
    fill: none;
    stroke: var(--blue-500);
    animation: swim-progress-spinner--check 1s linear forwards;
  }

  :host([appearance='icon']) .swim-progress-spinner__thumbs-down-icon {
    display: block;
    transform: translate(calc(50% - 35px), calc(50% - 28px));
    fill: none;
    stroke: var(--color-error, var(--red-500));
    animation: swim-progress-spinner--check 1s linear forwards;
  }
`;
