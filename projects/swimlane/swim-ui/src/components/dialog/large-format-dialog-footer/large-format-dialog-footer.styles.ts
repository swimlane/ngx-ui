import { css } from 'lit';
import { baseStyles } from '../../../styles/base';

export const largeFormatDialogFooterStyles = [
  baseStyles,
  css`
    :host {
      display: block;
      box-sizing: border-box;
      width: 100%;
    }

    .format-dialog-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--swim-format-footer-gap, var(--spacing-8, 0.5rem));
      width: 100%;
      height: 100%;
    }

    :host([align='start']) .format-dialog-footer {
      justify-content: flex-start;
    }

    :host([align='end']) .format-dialog-footer {
      justify-content: flex-end;
    }

    :host([align='center']) .format-dialog-footer {
      justify-content: center;
    }

    :host([align='space-between']) .format-dialog-footer {
      justify-content: space-between;
    }

    :host([align='space-around']) .format-dialog-footer {
      justify-content: space-around;
    }

    :host([align='space-evenly']) .format-dialog-footer {
      justify-content: space-evenly;
    }
  `
];
