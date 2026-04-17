import { css } from 'lit';
import { baseStyles } from '../../styles/base';
import { scrollbarStyles } from '../../styles/scrollbars';

/**
 * Dialog component styles matching @swimlane/ngx-ui design system.
 * Uses CSS variables from base; BEM: swim-dialog, swim-dialog__content, etc.
 * Includes scrollbar styles so .swim-scroll on the body works inside shadow DOM.
 *
 * Optional theme overrides (set on a parent or this host; inherit into shadow):
 * --swim-dialog-bg, --swim-dialog-border, --swim-dialog-header-color, --swim-dialog-body-color,
 * --swim-dialog-box-shadow, --swim-dialog-header-text-align (e.g. center)
 */
export const dialogStyles = [
  baseStyles,
  scrollbarStyles,
  css`
    :host {
      outline: none;
    }

    .swim-dialog {
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      inset: 0;
      width: 100%;
      height: 100vh;
      pointer-events: none;
      z-index: var(--swim-dialog-z, 991);
    }

    .swim-dialog.swim-dialog--open {
      pointer-events: auto;
    }

    /* Matches ngx-overlay: black at 80% opacity when active */
    .swim-dialog__backdrop {
      position: absolute;
      inset: 0;
      background-color: var(--black);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.1s ease-in;
    }

    .swim-dialog.swim-dialog--open .swim-dialog__backdrop {
      opacity: 0.8;
      pointer-events: auto;
      cursor: default;
    }

    /* ngx-dialog visibilityTransition void=>*: 0.2s ease-out, opacity 0→1, scale3d(1.2)→(1) */
    @keyframes swim-dialog-content-enter {
      from {
        opacity: 0;
        transform: scale3d(1.2, 1.2, 1.2);
      }
      to {
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }
    }

    .swim-dialog__content {
      outline: none;
      pointer-events: auto;
      position: relative;
      border-radius: var(--radius-8);
      border: var(--swim-dialog-border, none);
      box-shadow: var(--swim-dialog-box-shadow, var(--shadow-dialog-panel));
      background: var(--swim-dialog-bg, var(--grey-725));
      padding: 1.4rem;
      min-width: 250px;
      font-size: var(--font-size-m);
      color: var(--swim-dialog-body-color, var(--grey-200));
      z-index: calc(var(--swim-dialog-z, 991) + 1);
    }

    .swim-dialog.swim-dialog--open .swim-dialog__content {
      animation: swim-dialog-content-enter 0.2s ease-out forwards;
    }

    @media (prefers-reduced-motion: reduce) {
      .swim-dialog.swim-dialog--open .swim-dialog__content {
        animation: none;
        opacity: 1;
        transform: none;
      }
    }

    .swim-dialog__content--large,
    .swim-dialog__content--medium {
      padding: var(--spacing-0);
      width: calc(100vw - 120px);
      background: transparent;
      border: none;
      box-shadow: none;
    }

    .swim-dialog__content--large {
      height: calc(100vh - 120px);
      max-height: calc(100vh - 120px);
      border-radius: var(--radius-64);
      display: flex;
      flex-direction: column;
    }

    .swim-dialog__content--large .swim-dialog__body {
      flex: 1 1 auto;
      min-height: 0;
      max-height: none;
    }

    .swim-dialog__content--medium {
      height: auto;
      min-height: 340px;
      max-height: 75vh;
      max-width: 900px;
      border-radius: var(--radius-64);
      display: flex;
      flex-direction: column;
    }

    .swim-dialog__content--medium .swim-dialog__body {
      flex: 1 1 auto;
      min-height: 0;
      max-height: none;
    }

    .swim-dialog__close {
      position: absolute;
      font-size: var(--font-size-s);
      color: var(--grey-400);
      right: 1rem;
      top: 1rem;
      background: none;
      border: none;
      padding: 0.25rem;
      cursor: pointer;
      line-height: 1;
      border-radius: var(--radius-4);
    }

    .swim-dialog__close:hover,
    .swim-dialog__close:active {
      color: var(--white);
    }

    .swim-dialog__close:focus-visible {
      outline: 2px solid var(--blue-500);
      outline-offset: 2px;
    }

    .swim-dialog__header {
      margin: 0 0 1.4rem 0;
      text-align: var(--swim-dialog-header-text-align, start);
    }

    .swim-dialog__title,
    .swim-dialog__header h1,
    .swim-dialog__header h2 {
      font-size: var(--font-size-3xl);
      font-weight: 400;
      margin: 0 0 1.4rem 0;
      color: var(--swim-dialog-header-color, var(--grey-050));
      text-align: inherit;
    }

    .swim-dialog__content--medium .swim-dialog__header,
    .swim-dialog__content--large .swim-dialog__header {
      border-top-left-radius: var(--radius-64);
      border-top-right-radius: var(--radius-64);
    }

    .swim-dialog__body {
      margin: 0;
      max-height: calc(100vh - 12rem);
      min-height: 0;
    }

    .swim-dialog__footer {
      text-align: right;
      margin-top: 1.4rem;
    }

    .swim-dialog__footer .btn,
    .swim-dialog__footer swim-button {
      margin-left: var(--spacing-4);
    }

    /* Full screen variant (class="swim-dialog--full-screen" on host or wrapper) */
    :host(.swim-dialog--full-screen) .swim-dialog,
    .swim-dialog.swim-dialog--full-screen {
      width: 100%;
      height: 100%;
      height: 100dvh; /* avoid scroll from 100vh vs visible area */
      align-items: stretch;
      justify-content: flex-start;
      overflow-x: hidden;
      overflow-y: auto;
    }

    :host(.swim-dialog--full-screen) .swim-dialog__content,
    .swim-dialog.swim-dialog--full-screen .swim-dialog__content {
      box-shadow: none;
      border: none;
      box-sizing: border-box;
      width: 100%;
      min-height: 100%;
    }

    :host(.swim-dialog--full-screen) .swim-dialog__body,
    .swim-dialog.swim-dialog--full-screen .swim-dialog__body {
      max-height: none;
      overflow: visible;
    }

    :host(.swim-dialog--full-screen) .swim-dialog__close,
    .swim-dialog.swim-dialog--full-screen .swim-dialog__close {
      right: 1rem;
      top: 2rem;
    }

    /* Wizard / custom header-footer variant (class="wizard" on root) - style slotted header/footer */
    .swim-dialog.wizard .swim-dialog__content {
      padding: var(--spacing-0);
      background: var(--grey-725);
    }

    .swim-dialog.wizard .swim-dialog__body slot::slotted(.swim-dialog__header) {
      padding: 1.4rem;
      background: var(--grey-750);
      border-top-left-radius: var(--radius-16);
      border-top-right-radius: var(--radius-16);
      margin: 0;
      display: block;
    }

    .swim-dialog.wizard .swim-dialog__body slot::slotted(.swim-dialog__footer) {
      padding: 1.4rem;
      margin-top: 0;
      display: block;
    }
  `
];
