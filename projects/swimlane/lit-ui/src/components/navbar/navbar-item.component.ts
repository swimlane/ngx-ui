import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { navbarItemStyles } from './navbar-item.styles';
import { coerceNumberProperty } from '../../utils/coerce';

/**
 * SwimNavbarItem - A single item for use inside swim-navbar
 *
 * @slot - Item content (e.g. icon, label)
 *
 * @fires active-change - Fired when this item becomes active (detail: number index)
 */
@customElement('swim-navbar-item')
export class SwimNavbarItem extends LitElement {
  static styles = [baseStyles, navbarItemStyles];

  /**
   * The active index (set by parent navbar). When equal to index, item is styled active.
   */
  @property({ type: Number })
  get active(): number {
    return this._active;
  }
  set active(value: number) {
    const next = coerceNumberProperty(value, 0);
    if (this._active !== next) {
      const prev = this._active;
      this._active = next;
      this.requestUpdate('active', prev);
    }
  }
  private _active = 0;

  /**
   * Total number of items (set by parent navbar).
   */
  @property({ type: Number })
  get total(): number {
    return this._total;
  }
  set total(value: number) {
    this._total = coerceNumberProperty(value, 0);
  }
  private _total = 0;

  /**
   * Index of this item, zero-based (set by parent navbar).
   */
  @property({ type: Number })
  get index(): number {
    return this._index;
  }
  set index(value: number) {
    const next = coerceNumberProperty(value, 0);
    if (this._index !== next) {
      const prev = this._index;
      this._index = next;
      this.requestUpdate('index', prev);
    }
  }
  private _index = 0;

  private _clickBound = () => this._handleClick();

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._clickBound);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('click', this._clickBound);
    super.disconnectedCallback();
  }

  render() {
    const isActive = this._active === this._index;
    return html`
      <div
        class="swim-navbar-item ${isActive ? 'swim-navbar-item--active' : ''}"
        role="tab"
        aria-selected="${isActive}"
        tabindex="${isActive ? 0 : -1}"
        @keydown="${this._handleKeyDown}"
      >
        <slot></slot>
      </div>
    `;
  }

  /**
   * Activate this item (sets active to index and dispatches active-change).
   * Called by parent navbar or programmatically.
   */
  setActive(): void {
    if (this._active !== this._index) {
      this._active = this._index;
      this.requestUpdate();
      this.dispatchEvent(
        new CustomEvent('active-change', {
          detail: this._index,
          bubbles: true,
          composed: true
        })
      );
    }
  }

  private _handleClick(): void {
    this.setActive();
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.setActive();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-navbar-item': SwimNavbarItem;
  }
}
