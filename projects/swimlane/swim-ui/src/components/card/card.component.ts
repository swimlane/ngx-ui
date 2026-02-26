import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { cardComponentStyles } from './card.styles';
import { CardStatus } from './card-status.enum';
import { CardOrientation } from './card-orientation.enum';
import { CardAppearance } from './card-appearance.enum';
import { coerceBooleanProperty } from '../../utils/coerce';
import '../checkbox/checkbox.component';

/**
 * SwimCard - Card container matching @swimlane/ngx-ui design system.
 *
 * @slot - Default slot for card content (header, sections, body, footer).
 *
 * @fires select - Fired when the selectable checkbox is toggled (detail: boolean selected).
 * @fires outline-click - Fired when the outline text label is clicked.
 *
 * @csspart outline-text - The clickable outline text inner element (when outlineText is set).
 */
const CARD_TAG = 'swim-card';
export class SwimCard extends LitElement {
  static styles = cardComponentStyles;

  /** When true, card is non-interactive. */
  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  /** Layout direction: horizontal (row) or vertical (column). */
  @property({ type: String, reflect: true })
  orientation: CardOrientation | 'horizontal' | 'vertical' = CardOrientation.Horizontal;

  /** Status indicator dot: success, error, or disabled. */
  @property({ type: String, reflect: true })
  status?: CardStatus | 'success' | 'error' | 'disabled';

  /** Tooltip text for the status dot (e.g. title attribute). */
  @property({ type: String, attribute: 'status-tooltip' })
  statusTooltip = '';

  /** When true, shows a checkbox to select the card. */
  @property({ type: Boolean, reflect: true })
  get selectable(): boolean {
    return this._selectable;
  }
  set selectable(value: boolean) {
    this._selectable = coerceBooleanProperty(value);
  }
  private _selectable = false;

  /** When true (and selectable), card appears selected. */
  @property({ type: Boolean, reflect: true })
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    this._selected = coerceBooleanProperty(value);
  }
  private _selected = false;

  /** When true, outline and outline text use error color. */
  @property({ type: Boolean, reflect: true })
  get error(): boolean {
    return this._error;
  }
  set error(value: boolean) {
    this._error = coerceBooleanProperty(value);
  }
  private _error = false;

  /** Optional label shown in the outline (bottom border); when set, outline has a gap and this text is clickable. */
  @property({ type: String, attribute: 'outline-text' })
  outlineText = '';

  /** Visual style: normal (with background) or flat. */
  @property({ type: String, reflect: true })
  appearance: CardAppearance | 'normal' | 'flat' = CardAppearance.Normal;

  /** When true, the accent bar is hidden. */
  @property({ type: Boolean, attribute: 'hide-accent' })
  get hideAccent(): boolean {
    return this._hideAccent;
  }
  set hideAccent(value: boolean) {
    this._hideAccent = coerceBooleanProperty(value);
  }
  private _hideAccent = false;

  private _onOutlineClick(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('outline-click', { bubbles: true, composed: true }));
  }

  private _onSelectChange(e: CustomEvent) {
    e.stopPropagation();
    const checked = e.detail?.target?.checked ?? false;
    this.selected = checked;
    this.dispatchEvent(
      new CustomEvent('select', {
        detail: this.selected,
        bubbles: true,
        composed: true
      })
    );
  }

  private _onCheckboxClick(e: Event) {
    e.stopPropagation();
  }

  render() {
    const showOutline = this.selected && !this.outlineText && !this.error;
    const showOutlineError = this.error && !this.outlineText;
    const showOutlineText = Boolean(this.outlineText);
    const showStatus = Boolean(this.status);
    const statusClass =
      this.status === CardStatus.Success
        ? 'swim-card__status--success'
        : this.status === CardStatus.Error
        ? 'swim-card__status--error'
        : '';

    return html`
      ${showOutline ? html`<div class="swim-card__outline" aria-hidden="true"></div>` : nothing}
      ${showOutlineError
        ? html`<div class="swim-card__outline swim-card__outline--error" aria-hidden="true"></div>`
        : nothing}
      ${showOutlineText
        ? html`
            <div
              class="swim-card__outline-text ${this.error ? 'swim-card__outline-text--error' : ''}"
              aria-hidden="true"
            >
              <div
                part="outline-text"
                class="swim-card__outline-text-inner"
                role="button"
                tabindex="${this.disabled ? -1 : 0}"
                aria-label="${this.outlineText}"
                @click="${this._onOutlineClick}"
                @keydown="${(e: KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this._onOutlineClick(e as unknown as Event);
                  }
                }}"
              >
                ${this.outlineText}
              </div>
            </div>
          `
        : nothing}
      ${showStatus
        ? html`
            <div
              class="swim-card__status ${statusClass}"
              title="${this.statusTooltip}"
              role="status"
              aria-label="${this.statusTooltip || this.status || ''}"
            ></div>
          `
        : nothing}
      ${this.selectable
        ? html`
            <div class="swim-card__select" @click="${this._onCheckboxClick}">
              <swim-checkbox
                round
                .checked="${this.selected}"
                ?disabled="${this.disabled}"
                aria-label="Select card"
                @change="${this._onSelectChange}"
              ></swim-checkbox>
            </div>
          `
        : nothing}

      <slot></slot>

      ${!this.hideAccent ? html`<div class="swim-card__accent" aria-hidden="true"></div>` : nothing}
    `;
  }
}

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, SwimCard);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-card': SwimCard;
  }
}
