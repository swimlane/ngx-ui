import { LitElement, html, nothing } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { dialogStyles } from './dialog.styles';
import { DialogFormat } from './dialog-format.enum';
import { coerceBooleanProperty, coerceNumberProperty } from '../../utils/coerce';
import '../icon/icon.component';

/**
 * SwimDialog - Modal dialog matching @swimlane/ngx-ui design system.
 *
 * @slot - Default content (body). Use with dialog-title and optional header/footer.
 *
 * @fires open - Fired when the dialog is shown
 * @fires close - Fired when the dialog is closed (detail: boolean | void)
 *
 * @csspart content - The dialog content panel
 * @csspart close-button - The close button
 */
const DIALOG_TAG = 'swim-dialog';
export class SwimDialog extends LitElement {
  static styles = dialogStyles;

  /** Dialog title (shown in header for Regular format) */
  @property({ type: String, attribute: 'dialog-title' })
  dialogTitle = '';

  /** @deprecated Use dialog-title. If set, overrides dialogTitle for backward compatibility. */
  @property({ type: String })
  get title(): string {
    return this.dialogTitle;
  }
  set title(value: string) {
    if (value) this.dialogTitle = value;
  }

  /** Optional string content below the title (when no slot content) */
  @property({ type: String })
  content = '';

  /** Extra CSS class on the root wrapper */
  @property({ type: String })
  class = '';

  /** Extra CSS class on the content panel */
  @property({ type: String, attribute: 'css-class' })
  cssClass = '';

  /** Layout format: regular, medium, or large */
  @property({ type: String, reflect: true })
  format: DialogFormat | string = DialogFormat.Regular;

  /** Whether to show the backdrop (dimmed overlay behind the dialog). Set false for inline/toggle scenarios. */
  @property({
    type: Boolean,
    attribute: 'show-backdrop',
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => (value === null ? true : value !== 'false' && value !== '0'),
      toAttribute: (value: boolean) => (value ? '' : 'false')
    }
  })
  showBackdrop = true;

  /** Whether to show the close button */
  @property({ type: Boolean, attribute: 'close-button' })
  get closeButton(): boolean {
    return this._closeButton;
  }
  set closeButton(value: boolean) {
    this._closeButton = coerceBooleanProperty(value);
  }
  private _closeButton = true;

  /** Whether the dialog is visible */
  @property({ type: Boolean, reflect: true })
  get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
    const next = coerceBooleanProperty(value);
    if (this._visible === next) return;
    this._visible = next;
    if (next) {
      this._previousActiveElement =
        typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null;
      this.dispatchEvent(new CustomEvent('open', { bubbles: true }));
    } else {
      this._restoreFocus();
      this.dispatchEvent(new CustomEvent('close', { detail: undefined, bubbles: true }));
    }
  }
  private _visible = false;

  /** z-index for overlay and content */
  @property({ type: Number })
  get zIndex(): number {
    return this._zIndex;
  }
  set zIndex(value: number) {
    this._zIndex = coerceNumberProperty(value, 991);
  }
  private _zIndex = 991;

  /**
   * Optional callback invoked before closing. Return false to prevent close.
   * Set via property only (not an attribute).
   */
  @property({ attribute: false })
  beforeClose?: () => boolean;

  @state()
  private _contentId = `swim-dialog-content-${Math.random().toString(36).slice(2, 11)}`;

  @state()
  private _titleId = `swim-dialog-title-${Math.random().toString(36).slice(2, 11)}`;

  @query('.swim-dialog__content')
  private _contentEl!: HTMLElement;

  private _previousActiveElement: HTMLElement | null = null;

  private get _contentzIndex(): number {
    return this.zIndex + 1;
  }

  private get _canClose(): boolean {
    return this.beforeClose ? this.beforeClose() : true;
  }

  private _restoreFocus(): void {
    if (this._previousActiveElement && typeof this._previousActiveElement.focus === 'function') {
      this._previousActiveElement.focus();
    }
    this._previousActiveElement = null;
  }

  /** Show the dialog */
  show(): void {
    this.visible = true;
  }

  /** Hide the dialog (respects beforeClose) */
  hide(): void {
    if (!this._canClose) return;
    this.visible = false;
  }

  protected firstUpdated(): void {
    if (this.visible && this._contentEl) {
      this._contentEl.focus({ preventScroll: true });
    }
  }

  protected updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('visible') && this.visible && this._contentEl) {
      requestAnimationFrame(() => {
        this._contentEl?.focus({ preventScroll: true });
      });
    }
  }

  render() {
    if (!this.visible) return nothing;

    const isRegular = this.format === DialogFormat.Regular || this.format === 'regular';
    const isLarge = this.format === DialogFormat.Large || this.format === 'large';
    const isMedium = this.format === DialogFormat.Medium || this.format === 'medium';

    const contentClasses = [
      'swim-dialog__content',
      this.cssClass,
      isLarge ? 'swim-dialog__content--large' : '',
      isMedium ? 'swim-dialog__content--medium' : ''
    ]
      .filter(Boolean)
      .join(' ');

    const isFullScreen = this.class.includes('swim-dialog--full-screen');
    const wrapperClasses = ['swim-dialog', 'swim-dialog--open', this.class, isFullScreen ? 'swim-scroll' : '']
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="${wrapperClasses}" style="--swim-dialog-z: ${this.zIndex}" role="presentation">
        ${this.showBackdrop ? html`<div class="swim-dialog__backdrop" aria-hidden="true"></div>` : nothing}
        <div
          part="content"
          class="${contentClasses}"
          style="z-index: ${this._contentzIndex}"
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="${this.dialogTitle ? this._titleId : nothing}"
          id="${this._contentId}"
        >
          ${isRegular
            ? html`
                ${this.closeButton
                  ? html`
                      <button
                        part="close-button"
                        type="button"
                        class="swim-dialog__close"
                        aria-label="Close dialog"
                        @click="${this.hide}"
                      >
                        <swim-icon font-icon="x"></swim-icon>
                      </button>
                    `
                  : nothing}
                ${this.dialogTitle
                  ? html`
                      <div class="swim-dialog__header">
                        <h2 id="${this._titleId}" class="swim-dialog__title">${this.dialogTitle}</h2>
                      </div>
                    `
                  : nothing}
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content ? html`<div>${this.content}</div>` : nothing}
                </div>
              `
            : html`
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content ? html`<div>${this.content}</div>` : nothing}
                </div>
              `}
        </div>
      </div>
    `;
  }
}

if (!customElements.get(DIALOG_TAG)) {
  customElements.define(DIALOG_TAG, SwimDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-dialog': SwimDialog;
  }
}
