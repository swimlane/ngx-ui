import { css } from 'lit';
import { baseStyles } from '../../../styles/base';

export const largeFormatDialogFooterStyles = [
  baseStyles,
  css`
    :host {
      --swim-format-footer-gap: 0.5rem;
    }

    .format-dialog-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--swim-format-footer-gap);
      width: 100%;
      height: 100%;
    }
  `
];
