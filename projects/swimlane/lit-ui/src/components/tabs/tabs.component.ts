import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { tabsStyles } from './tabs.styles';
import { SwimTab } from './tab.component';
import { TabsAppearance } from './tabs-appearance.enum';
import { coerceBooleanProperty } from '../../utils/coerce';

/**
 * SwimTabs - Tabs container matching @swimlane/ngx-ui design system
 *
 * @slot - Default slot for swim-tab children (tab panels)
 *
 * @fires select-tab - Fired when the active tab changes (detail: { tab: SwimTab })
 * @fires select - Alias for select-tab (backwards compatibility)
 *
 * @csspart tablist - The tab list container (role=tablist)
 * @csspart tab-content - The container for tab panels
 */
@customElement('swim-tabs')
export class SwimTabs extends LitElement {
  static styles = [baseStyles, tabsStyles];

  @query('slot')
  private slotEl!: HTMLSlotElement;

  /**
   * Layout direction: vertical shows tabs on the left
   */
  @property({ type: Boolean, reflect: true })
  get vertical(): boolean {
    return this._vertical;
  }
  set vertical(value: boolean) {
    this._vertical = coerceBooleanProperty(value);
  }
  private _vertical = false;

  /**
   * Visual appearance: legacy (default) or light
   */
  @property({ type: String, reflect: true })
  appearance: TabsAppearance = TabsAppearance.Legacy;

  @state()
  private _tabs: SwimTab[] = [];

  private _slotChangeBound = () => this._syncTabs();
  private _tabActiveChangeBound = () => this.requestUpdate();

  override connectedCallback() {
    super.connectedCallback();
  }

  override firstUpdated() {
    this._syncTabs();
    this._listenToTabChanges();
    const slot = this.slotEl;
    if (slot) {
      slot.addEventListener('slotchange', this._slotChangeBound);
    }
  }

  override disconnectedCallback() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      slot.removeEventListener('slotchange', this._slotChangeBound);
    }
    this._tabs.forEach(tab => tab.removeEventListener('swim-tab-active-change', this._tabActiveChangeBound));
    super.disconnectedCallback();
  }

  private _listenToTabChanges() {
    this._tabs.forEach(tab => tab.addEventListener('swim-tab-active-change', this._tabActiveChangeBound));
  }

  private _syncTabs() {
    const slot = this.shadowRoot?.querySelector('slot');
    const assigned = (slot?.assignedElements({ flatten: true }) ?? []) as HTMLElement[];
    const tabs = assigned.filter((el): el is SwimTab => el instanceof SwimTab);
    this._tabs.forEach(tab => tab.removeEventListener('swim-tab-active-change', this._tabActiveChangeBound));
    this._tabs = tabs;
    this._listenToTabChanges();

    const actives = tabs.filter(t => t.active);
    if (actives.length > 1) {
      console.error('swim-tabs: Multiple active tabs set "active".');
    } else if (actives.length === 0 && tabs.length > 0) {
      tabs[0].active = true;
    }
  }

  private _tabClicked(tab: SwimTab) {
    if (tab.disabled) return;
    this._tabs.forEach(t => (t.active = t === tab));
    tab.active = true;
    this.dispatchEvent(
      new CustomEvent('select-tab', {
        detail: { tab },
        bubbles: true,
        composed: true
      })
    );
    this.dispatchEvent(
      new CustomEvent('select', {
        detail: { tab },
        bubbles: true,
        composed: true
      })
    );
  }

  private _move(offset: number) {
    const tabs = this._tabs;
    const currentIndex = tabs.findIndex(t => t.active);
    for (let i = currentIndex + offset; i >= 0 && i < tabs.length; i += offset) {
      const tab = tabs[i];
      if (tab && !tab.disabled) {
        this._tabClicked(tab);
        return;
      }
    }
  }

  /** Go to the previous tab. */
  prev(): void {
    this._move(-1);
  }

  /** Go to the next tab. */
  next(): void {
    this._move(1);
  }

  private _handleKeyDown(e: KeyboardEvent) {
    const isVertical = this.vertical;
    const key = e.key;
    if (isVertical && (key === 'ArrowUp' || key === 'ArrowDown')) {
      e.preventDefault();
      this._move(key === 'ArrowDown' ? 1 : -1);
    } else if (!isVertical && (key === 'ArrowLeft' || key === 'ArrowRight')) {
      e.preventDefault();
      this._move(key === 'ArrowRight' ? 1 : -1);
    }
  }

  render() {
    const tabs = this._tabs;
    return html`
      <section class="swim-tabs">
        <div class="swim-tabs__list" part="tablist" role="tablist" @keydown="${this._handleKeyDown}">
          ${tabs.map(
            tab => html`
              <button
                type="button"
                role="tab"
                id="${tab.tabId}"
                aria-controls="${tab.id}"
                aria-selected="${tab.active}"
                class="swim-tabs__tab ${tab.active ? 'swim-tabs__tab--active' : ''} ${tab.disabled
                  ? 'swim-tabs__tab--disabled'
                  : ''}"
                ?disabled="${tab.disabled}"
                @click="${() => this._tabClicked(tab)}"
              >
                ${tab.label}
              </button>
            `
          )}
        </div>
        <div class="swim-tabs__content" part="tab-content">
          <slot></slot>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-tabs': SwimTabs;
  }
}
