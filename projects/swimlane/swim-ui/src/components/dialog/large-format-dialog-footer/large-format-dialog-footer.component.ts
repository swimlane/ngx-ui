import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { largeFormatDialogFooterStyles } from './large-format-dialog-footer.styles';

const LARGE_FORMAT_DIALOG_FOOTER_TAG = 'swim-large-format-dialog-footer';

/**
 * Footer for Large or Medium format dialogs. Use inside swim-large-format-dialog-content with slot="footer".
 *
 * @slot - Footer content (e.g. action buttons)
 */
export class SwimLargeFormatDialogFooter extends LitElement {
  static styles = largeFormatDialogFooterStyles;

  @property({ type: String, reflect: true })
  format: 'large' | 'medium' = 'large';

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
