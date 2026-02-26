import { css } from 'lit';
import { baseStyles } from '../../styles/base';

export const splitAreaStyles = css`
  :host {
    overflow: hidden;
    box-sizing: border-box;
    min-height: 0;
  }
`;

export const splitAreaBaseStyles = [baseStyles, splitAreaStyles];
