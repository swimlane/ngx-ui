import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { tabStyles } from './tab.styles.js';
import { coerceBooleanProperty } from '../../utils/coerce';

let nextId = 0;

/**
 * SwimTab - A single tab panel for use inside swim-tabs
 *
 * @slot label - Custom label content (optional; if not used, the `label` property is shown in the tab list)
 * @slot - Tab panel content (shown when this tab is active)
 */
const TAB_TAG = 'swim-tab';
export class SwimTab extends LitElement {
  static styles = [baseStyles, tabStyles];

  private _instanceId = ++nextId;
  private _generatedPanelId = `tab-panel-${this._instanceId}`;
  private _generatedTabId = `tab-${this._instanceId}`;

  /**
   * Unique id for the panel (used for aria-controls)
   */
  @property({ type: String })
  get id(): string {
    return this._id ?? this._generatedPanelId;
  }
  set id(value: string) {
    this._id = value || this._generatedPanelId;
  }
  private _id?: string;

  /**
   * Id used for the tab button's aria-labelledby (set by swim-tabs or generated)
   */
  @property({ type: String, attribute: 'tab-id' })
  tabId = this._generatedTabId;

  /**
   * Tab label text (or use slot="label" for custom content)
   */
  @property({ type: String })
  label = '';

  /**
   * Optional tooltip for the tab button (e.g. full text when label is truncated).
   * Shown as the native title attribute on the tab button.
   */
  @property({ type: String, attribute: 'tab-title' })
  tabTitle = '';

  /**
   * Backwards compatibility alias for label
   */
  @property({ type: String })
  get title(): string {
    return this.label;
  }
  set title(value: string) {
    this.label = value;
  }

  /**
   * Whether this tab is currently active
   */
  @property({ type: Boolean, reflect: true })
  get active(): boolean {
    return this._active;
  }
  set active(value: boolean) {
    const next = coerceBooleanProperty(value);
    if (this._active !== next) {
      const prev = this._active;
      this._active = next;
      this.requestUpdate('active', prev);
      this.dispatchEvent(new CustomEvent('swim-tab-active-change', { bubbles: true, composed: true }));
    }
  }
  private _active = false;

  /**
   * Whether this tab is disabled
   */
  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  override connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('tab-id')) {
      this.tabId = this._generatedTabId;
    }
  }

  render() {
    return html`
      <div
        class="swim-tab__panel"
        role="tabpanel"
        id="${this.id}"
        aria-labelledby="${this.tabId}"
        ?hidden="${!this.active}"
      >
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get(TAB_TAG)) {
  customElements.define(TAB_TAG, SwimTab);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-tab': SwimTab;
  }
}
