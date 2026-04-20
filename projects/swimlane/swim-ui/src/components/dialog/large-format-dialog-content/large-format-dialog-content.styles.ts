import { css } from 'lit';
import { baseStyles } from '../../../styles/base';

/**
 * Large/Medium format dialog content styles matching ngx-large-format-dialog-content.
 * Solid background, fixed header/footer heights, scrollable body.
 *
 * Optional overrides (set on a parent or this host; inherit into shadow):
 * --swim-format-dialog-bg, --swim-format-dialog-shadow, --swim-format-max-height, --swim-format-border-radius,
 * --swim-format-header-height, --swim-format-header-height-large, --swim-format-header-height-medium,
 * --swim-format-divider, --swim-format-header-padding-x, --swim-format-header-padding-end,
 * --swim-format-header-gap, --swim-format-header-title-stack-gap,
 * --swim-format-header-close-gap, --swim-format-header-close-outline-width,
 * --swim-format-body-padding, --swim-format-body-min-height, --swim-format-body-max-height,
 * --swim-format-footer-height, --swim-format-footer-padding-y, --swim-format-footer-padding-x,
 * --swim-format-footer-gap, --swim-format-title-size, --swim-format-title-line
 * Inherited from parent swim-dialog when close-button is false:
 * --swim-dialog-header-action-display (e.g. none)
 */
export const largeFormatDialogContentStyles = [
  baseStyles,
  css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    .format-dialog-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      max-height: var(--swim-format-max-height, 75vh);
      background: var(--swim-format-dialog-bg, var(--grey-725));
      box-shadow: var(--swim-format-dialog-shadow, var(--shadow-dialog-panel));
      border-radius: var(--swim-format-border-radius, var(--radius-16, 16px));
      overflow: hidden;
    }

    :host([format='large']) .format-dialog-container {
      max-height: var(--swim-format-max-height, calc(100vh - 7.25rem));
    }

    :host([format='medium']) .format-dialog-container {
      max-height: var(--swim-format-max-height, 75vh);
      --swim-format-body-max-height-internal: calc(
        var(--swim-format-max-height, 75vh) -
          var(--swim-format-header-height, var(--swim-format-header-height-medium, 60px))
      );
    }

    .format-dialog-container__header {
      border-bottom: var(--swim-format-divider, var(--spacing-2, 2px) solid var(--grey-700));
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--swim-format-header-padding-x, var(--spacing-32, 2rem));
      padding-right: var(--swim-format-header-padding-end, var(--spacing-40, 2.5rem));
      gap: var(--swim-format-header-gap, var(--spacing-24, 1.5rem));
      overflow: visible;
    }

    :host([format='large']) .format-dialog-container__header {
      flex: 0 0 var(--swim-format-header-height, var(--swim-format-header-height-large, 90px));
      height: var(--swim-format-header-height, var(--swim-format-header-height-large, 90px));
      min-height: var(--swim-format-header-height, var(--swim-format-header-height-large, 90px));
    }

    :host([format='medium']) .format-dialog-container__header {
      flex: 0 0 var(--swim-format-header-height, var(--swim-format-header-height-medium, 60px));
      height: var(--swim-format-header-height, var(--swim-format-header-height-medium, 60px));
      min-height: var(--swim-format-header-height, var(--swim-format-header-height-medium, 60px));
    }

    /* Match ngx-large-format-dialog-header-title__wrapper: flex 0 0 20%, height 100%, justify-content center */
    .format-dialog-container__header-title {
      display: flex;
      flex-direction: column;
      gap: var(--swim-format-header-title-stack-gap, var(--spacing-2, 2px));
      flex: 0 0 20%;
      height: 100%;
      min-width: 0;
      max-width: 50%;
      justify-content: center;
    }

    .format-dialog-container__header-title--with-subtitle {
      align-items: flex-start;
    }

    .format-dialog-container__header-title h1 {
      margin: 0;
      color: var(--white);
      font-size: var(--swim-format-title-size, 1.75rem);
      font-weight: 400;
      line-height: var(--swim-format-title-line, 2rem);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .format-dialog-container__header-title h4 {
      margin: 0;
      color: var(--grey-250);
      font-size: var(--font-size-m);
      line-height: 1.5;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    :host([format='medium']) .format-dialog-container__header-title h1 {
      font-size: var(--swim-format-title-size, 1.375rem);
      line-height: var(--swim-format-title-line, 1.625rem);
    }

    .format-dialog-container__header-action {
      flex: 0 0 auto;
      max-width: 50%;
      display: var(--swim-dialog-header-action-display, flex);
      align-items: center;
      justify-content: flex-end;
    }

    .format-dialog-container__header-action__button {
      background: none;
      border: none;
      color: var(--grey-400);
      font-size: var(--font-size-s);
      line-height: 1;
      padding: 0.25rem 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: var(--swim-format-header-close-gap, var(--spacing-8, 0.5rem));
    }

    .format-dialog-container__header-action__button swim-icon {
      flex-shrink: 0;
      font-size: 1em;
      line-height: 0;
    }

    .format-dialog-container__header-action__button:hover {
      color: var(--white);
    }

    .format-dialog-container__header-action__button:focus-visible {
      outline: var(--swim-format-header-close-outline-width, var(--spacing-2, 2px)) solid var(--blue-500);
      outline-offset: var(--swim-format-header-close-outline-width, var(--spacing-2, 2px));
    }

    .format-dialog-container__body {
      flex: 1 1 auto;
      min-height: var(--swim-format-body-min-height, 215px);
      padding: var(--swim-format-body-padding, var(--spacing-32, 2rem));
      color: var(--grey-200);
    }

    :host([format='medium']) .format-dialog-container__body {
      max-height: var(--swim-format-body-max-height, var(--swim-format-body-max-height-internal, auto));
    }

    .format-dialog-container__footer {
      flex: 0 0 var(--swim-format-footer-height, calc(var(--spacing-48, 48px) + var(--spacing-16, 16px)));
      height: var(--swim-format-footer-height, calc(var(--spacing-48, 48px) + var(--spacing-16, 16px)));
      min-height: var(--swim-format-footer-height, calc(var(--spacing-48, 48px) + var(--spacing-16, 16px)));
      border-top: var(--swim-format-divider, var(--spacing-2, 2px) solid var(--grey-700));
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--swim-format-footer-gap, var(--spacing-8, 0.5rem));
      padding: var(--swim-format-footer-padding-y, var(--spacing-12, 0.75rem))
        var(--swim-format-footer-padding-x, var(--spacing-32, 2rem));
      box-sizing: border-box;
    }

    .format-dialog-container__footer--hidden {
      display: none;
      flex: 0 0 0;
      height: 0;
      min-height: 0;
      padding: 0;
      border-top: none;
      overflow: hidden;
    }

    /* Slotted footer host must span the row so inner justify-content (align) can take effect (ngx parity). */
    .format-dialog-container__footer ::slotted(*) {
      flex: 1 1 auto;
      min-width: 0;
      align-self: stretch;
    }
  `
];
