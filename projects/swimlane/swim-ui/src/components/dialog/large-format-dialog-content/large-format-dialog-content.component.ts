import { LitElement, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { litBooleanAttrDefaultFalse, litBooleanAttrDefaultTrue } from '../../../utils/coerce';
import { largeFormatDialogContentStyles } from './large-format-dialog-content.styles';
import { scrollbarStyles } from '../../../styles/scrollbars';
import '../../icon/icon.component';

/**
 * Content layout for Large or Medium format dialogs. Use inside swim-dialog when format="large" or format="medium".
 * Provides container, header (title + subtitle + close/cancel), scrollable body, and optional footer.
 * When the parent `swim-dialog` uses `close-button="false"`, the header close/cancel is hidden (inherited `--swim-dialog-header-action-display`).
 *
 * @slot - Body content
 * @slot footer - Footer content (e.g. buttons)
 *
 * @fires close-or-cancel - Fired when the header close/cancel is clicked (detail: boolean dirty). Does not bubble.
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
  @property({ type: Boolean, reflect: true, converter: litBooleanAttrDefaultFalse })
  dirty = false;

  /** When false, header close/cancel is hidden (synced from parent `swim-dialog` `close-button`). */
  @property({ type: Boolean, attribute: 'close-button', converter: litBooleanAttrDefaultTrue })
  closeButton = true;

  @state()
  private _hasFooterSlot = false;

  private _onCloseOrCancel(): void {
    this.dispatchEvent(new CustomEvent('close-or-cancel', { detail: this.dirty, bubbles: false, composed: false }));
  }

  override firstUpdated(): void {
    this._syncFooterSlotVisibility();
  }

  private _onFooterSlotChange = (): void => {
    this._syncFooterSlotVisibility();
  };

  private _syncFooterSlotVisibility(): void {
    const slot = this.renderRoot?.querySelector?.('slot[name="footer"]') as HTMLSlotElement | undefined;
    if (!slot) return;
    const nodes = slot.assignedNodes({ flatten: true });
    const hasContent = nodes.some(
      n =>
        n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && (n.textContent?.trim() ?? '').length > 0)
    );
    if (this._hasFooterSlot !== hasContent) {
      this._hasFooterSlot = hasContent;
    }
  }

  render() {
    const titleClasses = [
      'format-dialog-container__header-title',
      'format-dialog-container__header-title--with-subtitle'
    ].join(' ');

    const footerClasses = [
      'format-dialog-container__footer',
      this._hasFooterSlot ? '' : 'format-dialog-container__footer--hidden'
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <main class="format-dialog-container">
        <header class="format-dialog-container__header">
          <div class="format-dialog-container__header-title ${titleClasses}">
            <h1>${this.dialogTitle}</h1>
            ${this.dialogSubtitle ? html`<h4>${this.dialogSubtitle}</h4>` : nothing}
          </div>
          ${this.closeButton
            ? html`
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
              `
            : nothing}
        </header>
        <section class="format-dialog-container__body swim-scroll">
          <slot></slot>
        </section>
        <footer class="${footerClasses}">
          <slot name="footer" @slotchange="${this._onFooterSlotChange}"></slot>
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
