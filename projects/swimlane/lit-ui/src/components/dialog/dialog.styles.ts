import { css } from 'lit';
import { baseStyles } from '../../styles/base';
import { scrollbarStyles } from '../../styles/scrollbars';

/**
 * Dialog component styles matching @swimlane/ngx-ui design system.
 * Uses CSS variables from base; BEM: swim-dialog, swim-dialog__content, etc.
 * Includes scrollbar styles so .swim-scroll on the body works inside shadow DOM.
 */
export const dialogStyles = [
  baseStyles,
  scrollbarStyles,
  css`
    :host {
      --swim-dialog-bg: var(--grey-800);
      --swim-dialog-header-color: var(--grey-100);
      --swim-dialog-body-color: var(--grey-200);
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
    }

    .swim-dialog__content {
      pointer-events: auto;
      position: relative;
      border-radius: var(--radius-8);
      box-shadow: var(--shadow-3);
      background: var(--swim-dialog-bg);
      padding: 1.4rem;
      min-width: 250px;
      font-size: var(--font-size-m);
      color: var(--swim-dialog-body-color);
      animation-fill-mode: forwards;
      opacity: 0;
      transform: scale3d(1.2, 1.2, 1);
      transition: opacity 0.2s ease-out, transform 0.2s ease-out;
      z-index: calc(var(--swim-dialog-z, 991) + 1);
    }

    .swim-dialog.swim-dialog--open .swim-dialog__content {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }

    .swim-dialog__content--large,
    .swim-dialog__content--medium {
      padding: var(--spacing-0);
      width: calc(100vw - 120px);
      background-color: transparent;
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
    }

    .swim-dialog__title,
    .swim-dialog__header h1,
    .swim-dialog__header h2 {
      font-size: 1.8rem;
      font-weight: 400;
      margin: 0 0 1.4rem 0;
      color: var(--swim-dialog-header-color);
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
      width: 100vw;
      height: 100%;
      overflow-y: auto;
    }

    :host(.swim-dialog--full-screen) .swim-dialog__content,
    .swim-dialog.swim-dialog--full-screen .swim-dialog__content {
      box-shadow: none;
      width: 100%;
      min-height: 100vh;
    }

    :host(.swim-dialog--full-screen) .swim-dialog__close,
    .swim-dialog.swim-dialog--full-screen .swim-dialog__close {
      right: 6px;
      top: 8px;
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
