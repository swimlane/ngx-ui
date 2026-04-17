import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { coerceBooleanProperty, litBooleanAttrDefaultFalse } from '../../utils/coerce';

const OPTION_TAG = 'swim-option';

/**
 * SwimOption - Declarative option for use inside swim-select
 *
 * Usage:
 * ```html
 * <swim-select label="Attack Type">
 *   <swim-option name="breach" value="breach" label="Breach"></swim-option>
 *   <swim-option name="ddos" value="ddos" title="DDOS" group="Network"></swim-option>
 * </swim-select>
 * ```
 */
export class SwimOption extends LitElement {
  @property({ type: String })
  name = '';

  @property()
  value: any;

  /** Display label when different from `name` */
  @property({ type: String })
  label = '';

  /** Display title (alias of label for search / trigger) */
  @property({ type: String })
  title = '';

  @property({ type: String })
  description = '';

  @property({ type: String })
  group = '';

  @property({ type: Boolean, reflect: true, converter: litBooleanAttrDefaultFalse })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(val: boolean) {
    this._disabled = coerceBooleanProperty(val);
  }
  private _disabled = false;

  @property({ type: Boolean, reflect: true, converter: litBooleanAttrDefaultFalse })
  get hidden(): boolean {
    return this._hidden;
  }
  set hidden(val: boolean) {
    this._hidden = coerceBooleanProperty(val);
  }
  private _hidden = false;

  protected createRenderRoot() {
    return this;
  }

  render() {
    return html``;
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.display = 'none';
    this._notifyParent();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._notifyParent();
  }

  updated() {
    this._notifyParent();
  }

  private _notifyParent() {
    const parent = this.closest('swim-select');
    if (parent && typeof (parent as any)._onSlottedOptionsChange === 'function') {
      (parent as any)._onSlottedOptionsChange();
    }
  }
}

if (!customElements.get(OPTION_TAG)) {
  customElements.define(OPTION_TAG, SwimOption);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-option': SwimOption;
  }
}
