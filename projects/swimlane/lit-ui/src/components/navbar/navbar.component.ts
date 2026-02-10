import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { navbarStyles } from './navbar.styles';
import { SwimNavbarItem } from './navbar-item.component';
import { coerceBooleanProperty, coerceNumberProperty } from '../../utils/coerce';

const BAR_SIZE = 40;

/**
 * SwimNavbar - Navbar container with sliding active indicator, matching @swimlane/ngx-ui design system
 *
 * @slot - Default slot for swim-navbar-item children
 *
 * @fires active-change - Fired when the active item changes (detail: number index)
 *
 * @csspart nav-items - Container for nav items
 * @csspart bar-track - Track for the active bar
 * @csspart bar - The active indicator bar
 */
@customElement('swim-navbar')
export class SwimNavbar extends LitElement {
  static styles = [baseStyles, navbarStyles];

  @query('slot')
  private _slotEl!: HTMLSlotElement;

  /**
   * Whether the active indicator bar is on top of the items (default: false = bottom).
   */
  @property({ type: Boolean, reflect: true, attribute: 'bar-at-top' })
  get barAtTop(): boolean {
    return this._barAtTop;
  }
  set barAtTop(value: boolean) {
    this._barAtTop = coerceBooleanProperty(value);
  }
  private _barAtTop = false;

  /**
   * The active item index (zero-based). Two-way bindable via active-change.
   */
  @property({ type: Number })
  get active(): number {
    return this._active;
  }
  set active(value: number) {
    const v = coerceNumberProperty(value, 0);
    if (v !== this._active && !isNaN(v) && v >= 0 && (!this._navItems.length || v < this._navItems.length)) {
      this._active = v;
      this._syncItems();
      this.dispatchEvent(
        new CustomEvent('active-change', {
          detail: this._active,
          bubbles: true,
          composed: true
        })
      );
    }
  }
  private _active = 0;

  @state()
  private _navItems: SwimNavbarItem[] = [];

  private _slotChangeBound = () => this._syncFromSlot();
  private _activeChangeBound = (e: CustomEvent<number>) => this._onItemActiveChange(e);

  override connectedCallback(): void {
    super.connectedCallback();
    // Defer sync so slot has assigned nodes (e.g. when section loaded via innerHTML)
    requestAnimationFrame(() => this._syncFromSlot());
  }

  override firstUpdated(): void {
    this._syncFromSlot();
    const slot = this._slotEl ?? this.shadowRoot?.querySelector('slot');
    if (slot) {
      slot.addEventListener('slotchange', this._slotChangeBound);
    }
  }

  override disconnectedCallback(): void {
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      slot.removeEventListener('slotchange', this._slotChangeBound);
    }
    this._navItems.forEach(item => {
      item.removeEventListener('active-change', this._activeChangeBound as EventListener);
    });
    super.disconnectedCallback();
  }

  /**
   * Activate the item at the given index (zero-based). No-op if index is out of range or already active.
   */
  goTo(index: number): void {
    const i = coerceNumberProperty(index, -1);
    if (i >= 0 && i < this._navItems.length && i !== this._active) {
      const item = this._navItems[i];
      if (item) item.setActive();
    }
  }

  private _syncFromSlot(): void {
    const slot = this._slotEl ?? this.shadowRoot?.querySelector('slot');
    let assigned = (slot?.assignedElements({ flatten: true }) ?? []) as HTMLElement[];
    if (assigned.length === 0) {
      assigned = Array.from(this.children) as HTMLElement[];
    }
    const items = assigned.filter((el): el is SwimNavbarItem => el instanceof SwimNavbarItem);

    this._navItems.forEach(item => {
      item.removeEventListener('active-change', this._activeChangeBound as EventListener);
    });
    this._navItems = items;
    items.forEach(item => {
      item.addEventListener('active-change', this._activeChangeBound as EventListener);
    });
    this._syncItems();
  }

  private _syncItems(): void {
    const active = this._active;
    const total = this._navItems.length;
    this._navItems.forEach((item, i) => {
      item.index = i;
      item.total = total;
      item.active = active;
    });
  }

  private _onItemActiveChange(e: CustomEvent<number>): void {
    const index = e.detail;
    if (typeof index !== 'number' || index === this._active) return;
    if (index >= 0 && index < this._navItems.length) {
      this._active = index;
      this._syncItems();
      this.requestUpdate();
      this.dispatchEvent(
        new CustomEvent('active-change', {
          detail: this._active,
          bubbles: true,
          composed: true
        })
      );
    }
  }

  private _getBarTransform(): string {
    const complete = this._navItems.filter((_, i) => i < this._active).length;
    return `translateX(${BAR_SIZE * complete}px)`;
  }

  render() {
    const barAtTop = this._barAtTop;
    return html`
      <div class="swim-navbar__nav-items" part="nav-items" role="tablist">
        <slot></slot>
      </div>
      <div class="swim-navbar__bar-track" part="bar-track">
        <div
          class="swim-navbar__bar ${barAtTop ? 'swim-navbar__bar--top' : 'swim-navbar__bar--bottom'}"
          part="bar"
          style="transform: ${this._getBarTransform()}"
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-navbar': SwimNavbar;
  }
}
