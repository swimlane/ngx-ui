import { css } from 'lit';
import { baseStyles } from '../../styles/base';

export const splitStyles = css`
  :host {
    display: flex;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }

  :host([direction='row']) {
    flex-direction: row;
  }

  :host([direction='column']) {
    flex-direction: column;
  }

  slot {
    display: contents;
  }
`;

export const splitBaseStyles = [baseStyles, splitStyles];
