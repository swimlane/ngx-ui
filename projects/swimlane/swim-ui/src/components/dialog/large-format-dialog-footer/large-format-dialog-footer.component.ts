import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { largeFormatDialogFooterStyles } from './large-format-dialog-footer.styles';

const LARGE_FORMAT_DIALOG_FOOTER_TAG = 'swim-large-format-dialog-footer';

/** Horizontal alignment of slotted footer content (maps to flex `justify-content`). */
export type SwimLargeFormatDialogFooterAlign =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

/**
 * Footer for Large or Medium format dialogs. Use inside swim-large-format-dialog-content with slot="footer".
 *
 * @slot - Footer content (e.g. action buttons)
 * @attr align - Horizontal alignment: start | center | end | space-between | space-around | space-evenly (default: center)
 */
export class SwimLargeFormatDialogFooter extends LitElement {
  static styles = largeFormatDialogFooterStyles;

  @property({ type: String, reflect: true })
  format: 'large' | 'medium' = 'large';

  @property({ type: String, reflect: true })
  align: SwimLargeFormatDialogFooterAlign = 'center';

  render() {
    return html` <div class="format-dialog-footer"><slot></slot></div> `;
  }
}

if (!customElements.get(LARGE_FORMAT_DIALOG_FOOTER_TAG)) {
  customElements.define(LARGE_FORMAT_DIALOG_FOOTER_TAG, SwimLargeFormatDialogFooter);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-large-format-dialog-footer': SwimLargeFormatDialogFooter;
  }
}
