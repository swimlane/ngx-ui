import { LitElement, html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { sectionComponentStyles } from './section.styles';
import { SectionAppearance } from './section-appearance.enum';
import { TogglePosition } from './section-toggle-position.enum';
import { coerceBooleanProperty } from '../../utils/coerce';

/** Converter so attribute "false" is respected (Lit's default Boolean ignores attribute value). */
const booleanAttrConverter = {
  fromAttribute: (value: string | null): boolean => value !== 'false' && value !== '',
  toAttribute: (value: boolean): string => (value ? 'true' : 'false')
};
/** Same but default false when attribute is absent (for section-collapsed, header-toggle). */
const booleanAttrConverterDefaultFalse = {
  fromAttribute: (value: string | null): boolean => value !== null && value !== 'false',
  toAttribute: (value: boolean): string => (value ? 'true' : 'false')
};

let nextId = 0;

/**
 * SwimSection - Collapsible section with optional title and custom header.
 * Matches @swimlane/ngx-ui ngx-section design and behavior.
 *
 * @slot header - Custom header content (replaces or supplements sectionTitle).
 * @slot - Default slot for section body content.
 *
 * @fires toggle - Fired when the section is expanded or collapsed (detail: boolean collapsed).
 */
@customElement('swim-section')
export class SwimSection extends LitElement {
  static styles = sectionComponentStyles;

  /** Component id; used for aria-controls. */
  @property({ type: String, reflect: true })
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value || `section-${++nextId}`;
  }
  private _id = `section-${++nextId}`;

  /** Whether the section is collapsed. */
  @property({
    reflect: true,
    attribute: 'section-collapsed',
    converter: booleanAttrConverterDefaultFalse
  })
  get sectionCollapsed(): boolean {
    return this._sectionCollapsed;
  }
  set sectionCollapsed(value: boolean) {
    const next = value !== undefined && value !== null ? coerceBooleanProperty(value) : false;
    if (this._sectionCollapsed !== next) {
      this._sectionCollapsed = next;
    }
  }
  private _sectionCollapsed = false;

  /** Whether the section can be collapsed/expanded. */
  @property({
    reflect: true,
    attribute: 'section-collapsible',
    converter: booleanAttrConverter
  })
  get sectionCollapsible(): boolean {
    return this._sectionCollapsible;
  }
  set sectionCollapsible(value: boolean) {
    const next = value !== undefined && value !== null ? coerceBooleanProperty(value) : true;
    if (this._sectionCollapsible !== next) {
      this._sectionCollapsible = next;
    }
  }
  private _sectionCollapsible = true;

  /** When true, clicking the header toggles expand/collapse. */
  @property({
    reflect: true,
    attribute: 'header-toggle',
    converter: booleanAttrConverterDefaultFalse
  })
  get headerToggle(): boolean {
    return this._headerToggle;
  }
  set headerToggle(value: boolean) {
    const next = value !== undefined && value !== null ? coerceBooleanProperty(value) : false;
    if (this._headerToggle !== next) {
      this._headerToggle = next;
    }
  }
  private _headerToggle = false;

  /** Title text shown in the header. Attribute `section-title` matches ngx-section for parity. */
  @property({ type: String, reflect: true, attribute: 'section-title' })
  sectionTitle = '';

  /** Padding applied to the content area (CSS value, e.g. '1.8em'). */
  @property({ type: String })
  padding = '1.8em';

  /** Visual appearance: legacy, outline, light, minimal. */
  @property({ type: String, reflect: true })
  appearance: SectionAppearance | 'legacy' | 'outline' | 'light' | 'minimal' = SectionAppearance.Legacy;

  /** Position of the expand/collapse toggle: left, right, or none. */
  @property({ type: String, reflect: true, attribute: 'toggle-position' })
  togglePosition: TogglePosition | 'left' | 'right' | 'none' = TogglePosition.Left;

  @state()
  private _hasHeaderSlot = false;

  @query('slot[name="header"]')
  private _headerSlot?: HTMLSlotElement;

  private _headerSlotChangeBound = (): void => this._checkHeaderSlot();
  private _headerSlotForCleanup?: HTMLSlotElement;

  private get _contentId(): string {
    return `${this.id}-content`;
  }

  override firstUpdated(): void {
    this._checkHeaderSlot();
    const slot = this.renderRoot?.querySelector?.('slot[name="header"]') ?? this._headerSlot;
    if (slot) {
      this._headerSlotForCleanup = slot;
      slot.addEventListener('slotchange', this._headerSlotChangeBound);
    }
  }

  override disconnectedCallback(): void {
    if (this._headerSlotForCleanup) {
      this._headerSlotForCleanup.removeEventListener('slotchange', this._headerSlotChangeBound);
      this._headerSlotForCleanup = undefined;
    }
    super.disconnectedCallback();
  }

  private _checkHeaderSlot(): void {
    const slot = this.renderRoot?.querySelector?.('slot[name="header"]') ?? this._headerSlot;
    if (slot) {
      const nodes = (slot as HTMLSlotElement).assignedNodes({ flatten: true });
      const hasContent = nodes.some(
        n =>
          n.nodeType === Node.ELEMENT_NODE ||
          (n.nodeType === Node.TEXT_NODE && (n.textContent?.trim() ?? '').length > 0)
      );
      if (this._hasHeaderSlot !== hasContent) {
        this._hasHeaderSlot = hasContent;
      }
    }
  }

  private _headerIsEmpty(): boolean {
    return !this.sectionTitle?.trim() && !this._hasHeaderSlot;
  }

  private _onToggle(e?: Event): void {
    e?.stopPropagation();
    if (!this.sectionCollapsible) return;
    const nextCollapsed = !this.sectionCollapsed;
    this.sectionCollapsed = nextCollapsed;
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: nextCollapsed,
        bubbles: true,
        composed: true
      })
    );
  }

  private _onHeaderKeydown(e: KeyboardEvent): void {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    if (!this.headerToggle || !this.sectionCollapsible) return;
    e.preventDefault();
    this._onToggle(e as unknown as Event);
  }

  private _onHeaderClick(): void {
    if (this.headerToggle && this.sectionCollapsible) this._onToggle();
  }

  render() {
    const collapsible = this.sectionCollapsible;
    const showToggle = collapsible && this.togglePosition !== TogglePosition.None && this.togglePosition !== 'none';
    const toggleRight = this.togglePosition === TogglePosition.Right || this.togglePosition === 'right';

    const headerClasses = [
      'swim-section__header',
      this.sectionCollapsed ? 'swim-section__header--collapsed' : '',
      collapsible ? 'swim-section__header--collapsible' : '',
      this.headerToggle ? 'swim-section__header--header-toggle' : '',
      toggleRight ? 'swim-section__header--toggle-right' : ''
    ]
      .filter(Boolean)
      .join(' ');

    const headerEmpty = this._headerIsEmpty();
    return html`
      <div class="swim-section__inner">
        <header
          class="${headerClasses}${headerEmpty ? ' swim-section__header--empty' : ''}"
          role="${this.headerToggle && collapsible && !headerEmpty ? 'button' : 'presentation'}"
          tabindex="${this.headerToggle && collapsible && !headerEmpty ? 0 : -1}"
          aria-expanded="${headerEmpty ? undefined : this.sectionCollapsed ? 'false' : 'true'}"
          aria-controls="${this._contentId}"
          @click="${this._onHeaderClick}"
          @keydown="${this._onHeaderKeydown}"
        >
          ${showToggle && !headerEmpty
            ? html`
                <button
                  type="button"
                  class="swim-section__toggle"
                  title="Toggle Content Visibility"
                  aria-controls="${this._contentId}"
                  aria-expanded="${this.sectionCollapsed ? 'false' : 'true'}"
                  @click="${this._onToggle}"
                  @keydown="${(e: KeyboardEvent) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      this._onToggle(e as unknown as Event);
                    }
                  }}"
                >
                  ${customElements.get('swim-icon')
                    ? html`<swim-icon
                        font-icon="${this.sectionCollapsed ? 'chevron-bold-right' : 'chevron-bold-down'}"
                      ></swim-icon>`
                    : html`<span class="swim-section__toggle-icon" aria-hidden="true"
                        >${this.sectionCollapsed ? '›' : '∨'}</span
                      >`}
                </button>
              `
            : nothing}
          <div class="swim-section__header-content">
            ${this.sectionTitle?.trim()
              ? html`<h1 class="swim-section__header-title">${this.sectionTitle}</h1>`
              : nothing}
            <slot name="header"></slot>
          </div>
        </header>
        ${!this.sectionCollapsed
          ? html`
              <div
                id="${this._contentId}"
                class="swim-section__content"
                style="padding: ${this.padding}"
                role="region"
                aria-labelledby="${headerEmpty ? '' : undefined}"
              >
                <slot></slot>
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-section': SwimSection;
  }
}
