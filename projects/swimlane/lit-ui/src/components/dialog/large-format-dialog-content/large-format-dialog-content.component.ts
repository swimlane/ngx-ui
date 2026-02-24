import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { largeFormatDialogContentStyles } from './large-format-dialog-content.styles';
import { scrollbarStyles } from '../../../styles/scrollbars';
import '../../icon/icon.component';

/**
 * Content layout for Large or Medium format dialogs. Use inside swim-dialog when format="large" or format="medium".
 * Provides container, header (title + subtitle + close/cancel), scrollable body, and optional footer.
 *
 * @slot - Body content
 * @slot footer - Footer content (e.g. buttons)
 *
 * @fires close-or-cancel - Fired when the header close/cancel button is clicked (detail: boolean – true if dirty)
 */
const LARGE_FORMAT_DIALOG_CONTENT_TAG = 'swim-large-format-dialog-content';
export class SwimLargeFormatDialogContent extends LitElement {
  static styles = [scrollbarStyles, largeFormatDialogContentStyles];

  /** Format: large (taller header) or medium */
  @property({ type: String, reflect: true })
  format: 'large' | 'medium' = 'large';

  /** Header title */
  @property({ type: String, attribute: 'dialog-title' })
  dialogTitle = '';

  /** Optional subtitle below the title */
  @property({ type: String, attribute: 'dialog-subtitle' })
  dialogSubtitle = '';

  /** Label for the close button when not dirty */
  @property({ type: String, attribute: 'dialog-action-title' })
  dialogActionTitle = 'Close';

  /** Label for the cancel button when dirty */
  @property({ type: String, attribute: 'dialog-dirty-action-title' })
  dialogDirtyActionTitle = 'Cancel';

  /** When true, shows cancel label and emits dirty flag on close */
  @property({ type: Boolean, reflect: true })
  dirty = false;

  private _onCloseOrCancel(): void {
    this.dispatchEvent(new CustomEvent('close-or-cancel', { detail: this.dirty, bubbles: true, composed: true }));
  }

  render() {
    const titleClasses = [
      'format-dialog-container__header-title',
      'format-dialog-container__header-title--with-subtitle'
    ].join(' ');

    return html`
      <main class="format-dialog-container">
        <header class="format-dialog-container__header">
          <div class="format-dialog-container__header-title ${titleClasses}">
            <h1>${this.dialogTitle}</h1>
            ${this.dialogSubtitle ? html`<h4>${this.dialogSubtitle}</h4>` : nothing}
          </div>
          <div class="format-dialog-container__header-action">
            <button
              type="button"
              class="format-dialog-container__header-action__button"
              aria-label="${this.dirty ? this.dialogDirtyActionTitle : this.dialogActionTitle}"
              @click="${this._onCloseOrCancel}"
            >
              <swim-icon font-icon="x"></swim-icon>
              ${this.dirty ? this.dialogDirtyActionTitle : this.dialogActionTitle}
            </button>
          </div>
        </header>
        <section class="format-dialog-container__body swim-scroll">
          <slot></slot>
        </section>
        <footer class="format-dialog-container__footer">
          <slot name="footer"></slot>
        </footer>
      </main>
    `;
  }
}

if (!customElements.get(LARGE_FORMAT_DIALOG_CONTENT_TAG)) {
  customElements.define(LARGE_FORMAT_DIALOG_CONTENT_TAG, SwimLargeFormatDialogContent);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-large-format-dialog-content': SwimLargeFormatDialogContent;
  }
}
