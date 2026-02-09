import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { buttonToggleGroupStyles } from './button-toggle-group.styles';
import { coerceBooleanProperty } from '../../utils/coerce';
import type { SwimButtonToggle } from './button-toggle.component';

let nextId = 0;

/**
 * SwimButtonToggleGroup - Container for swim-button-toggle children.
 * Single selection; value matches the selected toggle's value.
 * Matches @swimlane/ngx-ui design and behavior.
 *
 * @slot - swim-button-toggle elements
 *
 * @fires value-change - Fired when selection changes (detail: selected value)
 */
@customElement('swim-button-toggle-group')
export class SwimButtonToggleGroup extends LitElement {
  static styles = [baseStyles, buttonToggleGroupStyles];
  static formAssociated = true;

  private _internals: ElementInternals;
  private _uniqueId = `swim-button-toggle-group-${++nextId}`;

  @query('slot')
  private _slot!: HTMLSlotElement;

  @state()
  private _animationHolderLeft = 0;

  @state()
  private _animationHolderWidth = 0;

  @property({ type: String })
  get id(): string {
    return this._id ?? this._uniqueId;
  }
  set id(value: string) {
    this._id = value;
  }
  private _id?: string;

  /**
   * Optional label above the toggle group
   */
  @property({ type: String })
  label = '';

  /**
   * Selected value (matches one of the child toggle values).
   * When set via attribute, it is a string; can be any type when set programmatically.
   */
  @property()
  get value(): unknown {
    return this._value;
  }
  set value(v: unknown) {
    if (this._value === v) return;
    this._value = v;
    this._internals.setFormValue(v != null ? String(v) : '');
    this._syncSelection();
  }
  private _value: unknown = undefined;

  /**
   * Whether the entire group is disabled
   */
  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._syncDisabled();
  }
  private _disabled = false;

  constructor() {
    super();
    this._internals = (this as any).attachInternals?.() ?? ({} as ElementInternals);
    this.setAttribute('role', 'group');
    this._boundValueChange = this._onValueChangeEvent.bind(this);
  }

  private _boundValueChange: (e: Event) => void;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('value-change', this._boundValueChange);
    if (this._internals.setFormValue) {
      this._internals.setFormValue(this._value != null ? String(this._value) : '');
    }
  }

  private _slotChangeBound = (): void => this._onSlotChange();
  private _slotForCleanup: HTMLSlotElement | null = null;

  disconnectedCallback() {
    if (this._slotForCleanup) {
      this._slotForCleanup.removeEventListener('slotchange', this._slotChangeBound);
      this._slotForCleanup = null;
    }
    this.removeEventListener('value-change', this._boundValueChange);
    super.disconnectedCallback();
  }

  firstUpdated(changed: PropertyValues) {
    super.firstUpdated(changed);
    const slot = this._slot;
    if (slot) {
      this._slotForCleanup = slot;
      slot.addEventListener('slotchange', this._slotChangeBound);
    }
    this._onSlotChange();
  }

  updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('value') || changed.has('disabled')) {
      this._syncSelection();
      this._syncDisabled();
    }
  }

  private _getToggles(): SwimButtonToggle[] {
    const slot = this._slot;
    if (!slot) return [];
    const assigned = slot.assignedElements({ flatten: true });
    return assigned.filter(
      (el): el is SwimButtonToggle => el instanceof HTMLElement && el.tagName === 'SWIM-BUTTON-TOGGLE'
    );
  }

  private _onSlotChange() {
    this._syncSelection();
    this._syncDisabled();
    requestAnimationFrame(() => this._calcAnimationDimensions());
  }

  private _syncSelection() {
    const toggles = this._getToggles();
    const val = this._value;
    toggles.forEach(t => {
      t.checked = t.value !== undefined && t.value === val;
    });
    requestAnimationFrame(() => this._calcAnimationDimensions());
  }

  private _syncDisabled() {
    const toggles = this._getToggles();
    toggles.forEach(t => {
      t.disabled = this._disabled;
    });
  }

  private _calcAnimationDimensions() {
    const toggles = this._getToggles();
    if (!toggles.length || this._disabled) {
      this._animationHolderLeft = 0;
      this._animationHolderWidth = 0;
      return;
    }
    const selectedIndex = toggles.findIndex(t => t.value !== undefined && t.value === this._value);
    if (selectedIndex < 0) {
      this._animationHolderLeft = 0;
      this._animationHolderWidth = 0;
      return;
    }
    let left = 0;
    for (let i = 0; i < selectedIndex; i++) {
      left += (toggles[i] as HTMLElement).offsetWidth ?? 0;
    }
    const gap = 2;
    left += selectedIndex * gap + 2;
    const selectedEl = toggles[selectedIndex] as HTMLElement;
    const w = Math.max(0, (selectedEl?.offsetWidth ?? 0) - 4);
    this._animationHolderLeft = left;
    this._animationHolderWidth = w;
  }

  private _onValueChangeEvent(e: Event) {
    const ce = e as CustomEvent<unknown>;
    const newValue = ce.detail;
    if (this._value === newValue) return;
    this._value = newValue;
    this._internals.setFormValue(newValue != null ? String(newValue) : '');
    this._syncSelection();
    this.dispatchEvent(
      new CustomEvent('value-change', {
        detail: newValue,
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <div class="swim-button-toggle-group__container" id="${this.id}">
        ${this.label
          ? html`<label class="swim-button-toggle-group__container__label" for="${this.id}-toggles"
              >${this.label}</label
            >`
          : ''}
        <div
          class="swim-button-toggle-group__container__toggle-buttons"
          id="${this.id}-toggles"
          role="group"
          aria-label="${this.label || 'Toggle group'}"
        >
          <div
            class="swim-button-toggle-group__container__toggle-buttons__animation-holder"
            style="left: ${this._animationHolderLeft}px; width: ${this._animationHolderWidth}px;"
          ></div>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-button-toggle-group': SwimButtonToggleGroup;
  }
}
