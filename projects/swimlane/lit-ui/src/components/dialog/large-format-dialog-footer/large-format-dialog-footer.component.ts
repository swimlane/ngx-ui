import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { largeFormatDialogFooterStyles } from './large-format-dialog-footer.styles';

/**
 * Footer for Large or Medium format dialogs. Use inside swim-large-format-dialog-content with slot="footer".
 *
 * @slot - Footer content (e.g. action buttons)
 */
@customElement('swim-large-format-dialog-footer')
export class SwimLargeFormatDialogFooter extends LitElement {
  static styles = largeFormatDialogFooterStyles;

  @property({ type: String, reflect: true })
  format: 'large' | 'medium' = 'large';

  render() {
    return html` <div class="format-dialog-footer"><slot></slot></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-large-format-dialog-footer': SwimLargeFormatDialogFooter;
  }
}
