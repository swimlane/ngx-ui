import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { tooltipContentStyles } from './tooltip.styles';
import { PlacementType } from './placement-type.enum';
import { AlignmentType } from './alignment-type.enum';
import { StyleType } from './style-type.enum';
import { ShowType } from './show-type.enum';
import { positionContent, positionCaret, determinePlacement } from './position';
import type { Dimensions } from './position';
import { coerceBooleanProperty, coerceNumberProperty } from '../../utils/coerce';

/**
 * SwimTooltip – tooltip and popover wrapper matching @swimlane/ngx-ui.
 *
 * @slot - Trigger element (e.g. button or link). Tooltip shows on hover/focus/click per show-event.
 * @slot content - Optional custom content. When used, overrides the `content` attribute.
 *
 * @fires show - Fired when the tooltip is shown.
 * @fires hide - Fired when the tooltip is hidden.
 *
 * @csspart trigger - The wrapper around the default slot (trigger).
 * @csspart panel - The tooltip/popover panel.
 * @csspart content - The content area inside the panel.
 */
@customElement('swim-tooltip')
export class SwimTooltip extends LitElement {
  static styles = tooltipContentStyles;

  /** Tooltip text or HTML (used when slot "content" is not provided). */
  @property({ type: String })
  content = '';

  /** Placement relative to trigger. */
  @property({ type: String, reflect: true, attribute: 'placement' })
  placement: PlacementType = PlacementType.top;

  /** Alignment of tooltip along the placement axis. */
  @property({ type: String, reflect: true, attribute: 'alignment' })
  alignment: AlignmentType = AlignmentType.center;

  /** Visual style: tooltip (compact) or popover. */
  @property({ type: String, reflect: true, attribute: 'type' })
  type: StyleType = StyleType.popover;

  /** When to show: all (hover + focus + click), focus, mouseover, or click. */
  @property({ type: String, attribute: 'show-event' })
  showEvent: ShowType = ShowType.all;

  /** Space in pixels between trigger and panel. */
  @property({ type: Number, attribute: 'spacing' })
  get spacing(): number {
    return this._spacing;
  }
  set spacing(value: number) {
    this._spacing = coerceNumberProperty(value, 10);
  }
  private _spacing = 10;

  /** Whether to show the caret/arrow. Default true. Use show-caret="false" in HTML to hide. */
  @property({
    type: Boolean,
    attribute: 'show-caret',
    converter: {
      fromAttribute: (value: string | null) => value !== 'false',
      toAttribute: (value: boolean) => (value ? '' : 'false')
    }
  })
  get showCaret(): boolean {
    return this._showCaret;
  }
  set showCaret(value: boolean) {
    this._showCaret = coerceBooleanProperty(value);
  }
  private _showCaret = true;

  /** Whether tooltip is disabled. */
  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  /** Close when clicking outside. */
  @property({ type: Boolean, attribute: 'close-on-click-outside' })
  get closeOnClickOutside(): boolean {
    return this._closeOnClickOutside;
  }
  set closeOnClickOutside(value: boolean) {
    this._closeOnClickOutside = coerceBooleanProperty(value);
  }
  private _closeOnClickOutside = true;

  /** Close when mouse leaves trigger (and panel if applicable). */
  @property({ type: Boolean, attribute: 'close-on-mouse-leave' })
  get closeOnMouseLeave(): boolean {
    return this._closeOnMouseLeave;
  }
  set closeOnMouseLeave(value: boolean) {
    this._closeOnMouseLeave = coerceBooleanProperty(value);
  }
  private _closeOnMouseLeave = true;

  /** Delay in ms before hiding. */
  @property({ type: Number, attribute: 'hide-timeout' })
  get hideTimeout(): number {
    return this._hideTimeout;
  }
  set hideTimeout(value: number) {
    this._hideTimeout = coerceNumberProperty(value, 300);
  }
  private _hideTimeout = 300;

  /** Delay in ms before showing. */
  @property({ type: Number, attribute: 'show-timeout' })
  get showTimeout(): number {
    return this._showTimeout;
  }
  set showTimeout(value: number) {
    this._showTimeout = coerceNumberProperty(value, 100);
  }
  private _showTimeout = 100;

  /** Optional CSS class(es) applied to the panel. */
  @property({ type: String, attribute: 'css-class' })
  cssClass = '';

  @state()
  private _open = false;

  @state()
  private _panelTop = 0;

  @state()
  private _panelLeft = 0;

  @state()
  private _effectivePlacement: PlacementType = PlacementType.top;

  @state()
  private _caretTop = 0;

  @state()
  private _caretLeft = 0;

  @state()
  private _animate = false;

  private _triggerRef: HTMLElement | null = null;
  private _panelRef: HTMLElement | null = null;
  private _caretRef: HTMLElement | null = null;
  private _showTimer: number | undefined;
  private _hideTimer: number | undefined;
  private _boundDocumentClick: ((e: MouseEvent) => void) | null = null;
  private _openFromClick = false;
  private _tooltipId = `swim-tooltip-${Math.random().toString(36).slice(2, 11)}`;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('resize', this._throttledPosition);
  }

  disconnectedCallback(): void {
    window.removeEventListener('resize', this._throttledPosition);
    this._clearShowTimer();
    this._clearHideTimer();
    this._removeDocumentClick();
    super.disconnectedCallback();
  }

  /** Whether the host has a child with slot="content" (detected from light DOM so we can open before panel is rendered). */
  private _hasContentSlot(): boolean {
    return !!this.querySelector('[slot="content"]');
  }

  private get _listensFocus(): boolean {
    return this.showEvent === ShowType.all || this.showEvent === ShowType.focus;
  }

  private get _listensHover(): boolean {
    return this.showEvent === ShowType.all || this.showEvent === ShowType.mouseover;
  }

  private get _listensClick(): boolean {
    return this.showEvent === ShowType.all || this.showEvent === ShowType.click;
  }

  /** Opens the tooltip (optionally immediately, without show timeout). */
  show(immediate = false): void {
    if (this._open || this.disabled) return;
    this._clearShowTimer();
    this._clearHideTimer();
    const run = () => {
      if (this._open || this.disabled) return;
      const hasContent = this._hasContentSlot || (this.content != null && this.content !== '');
      if (!hasContent) return;
      this._open = true;
      this._effectivePlacement = this.placement;
      requestAnimationFrame(() => {
        this._position();
        requestAnimationFrame(() => {
          this._animate = true;
          this._addHideListeners();
        });
      });
      this.dispatchEvent(new CustomEvent('show', { detail: true, bubbles: true }));
    };
    if (immediate) {
      run();
    } else {
      this._showTimer = window.setTimeout(run, this.showTimeout);
    }
  }

  /** Hides the tooltip (optionally immediately). */
  hide(immediate = false): void {
    if (!this._open) return;
    this._clearShowTimer();
    this._clearHideTimer();
    const destroy = () => {
      if (!this._open) return;
      this._open = false;
      this._animate = false;
      this._openFromClick = false;
      this._removeDocumentClick();
      this.dispatchEvent(new CustomEvent('hide', { detail: true, bubbles: true }));
    };
    if (immediate) {
      destroy();
    } else {
      this._hideTimer = window.setTimeout(destroy, this.hideTimeout);
    }
  }

  private _clearShowTimer(): void {
    if (this._showTimer != null) {
      window.clearTimeout(this._showTimer);
      this._showTimer = undefined;
    }
  }

  private _clearHideTimer(): void {
    if (this._hideTimer != null) {
      window.clearTimeout(this._hideTimer);
      this._hideTimer = undefined;
    }
  }

  private _removeDocumentClick(): void {
    if (this._boundDocumentClick) {
      document.removeEventListener('click', this._boundDocumentClick, true);
      this._boundDocumentClick = null;
    }
  }

  private _position(): void {
    const trigger = this._triggerRef ?? (this.shadowRoot?.querySelector('.swim-tooltip__trigger') as HTMLElement);
    const panel = this._panelRef ?? (this.shadowRoot?.querySelector('.swim-tooltip__panel') as HTMLElement);
    const caret = this._caretRef ?? (this.shadowRoot?.querySelector('.swim-tooltip__caret') as HTMLElement);
    if (!trigger || !panel) return;

    const hostDim: Dimensions = trigger.getBoundingClientRect();
    if (!hostDim.height && !hostDim.width) return;

    const elmDim: Dimensions = panel.getBoundingClientRect();
    this._effectivePlacement = determinePlacement(this.placement, elmDim, hostDim, this.spacing, this.alignment);

    const { top, left } = positionContent(this._effectivePlacement, elmDim, hostDim, this.spacing, this.alignment);
    this._panelTop = top;
    this._panelLeft = left;

    if (this.showCaret && caret) {
      const caretDim = caret.getBoundingClientRect();
      const caretPos = positionCaret(this._effectivePlacement, elmDim, hostDim, caretDim, this.alignment);
      this._caretTop = caretPos.top;
      this._caretLeft = caretPos.left;
    }
  }

  private _throttleTimeout: number | undefined;
  private _throttledPosition = (): void => {
    if (this._throttleTimeout != null) return;
    this._throttleTimeout = window.setTimeout(() => {
      this._throttleTimeout = undefined;
      if (this._open) this._position();
    }, 100);
  };

  private _addHideListeners(): void {
    const panel = this._panelRef ?? this.shadowRoot?.querySelector('.swim-tooltip__panel');
    if (!panel) return;

    panel.addEventListener('mouseenter', () => this._clearHideTimer());
    if (this.closeOnMouseLeave) {
      panel.addEventListener('mouseleave', (e: MouseEvent) => {
        const related = (e as MouseEvent & { relatedTarget?: Node }).relatedTarget as Node | null;
        if (related && this._triggerRef?.contains(related)) return;
        this.hide();
      });
    }
    if (this.closeOnClickOutside) {
      this._boundDocumentClick = (e: MouseEvent) => {
        const target = e.target as Node;
        if (panel.contains(target)) return;
        if (this._triggerRef?.contains(target)) return;
        this.hide(true);
      };
      setTimeout(() => document.addEventListener('click', this._boundDocumentClick!, true), 0);
    }
  }

  private _onTriggerFocus = (): void => {
    if (this._listensFocus) this.show();
  };

  private _onTriggerBlur = (): void => {
    if (this._listensFocus) this.hide(true);
  };

  private _onTriggerMouseEnter = (): void => {
    if (this._listensHover) this.show();
  };

  private _onTriggerMouseLeave = (e: MouseEvent): void => {
    const related = (e as MouseEvent & { relatedTarget?: Node }).relatedTarget as Node | null;
    const panel = this._panelRef ?? this.shadowRoot?.querySelector('.swim-tooltip__panel');
    if (panel?.contains(related)) return;
    if (this._listensHover && this.closeOnMouseLeave) this.hide();
    if (this._listensClick) this.hide();
  };

  private _onPanelMouseLeave = (): void => {
    if (this.closeOnMouseLeave) this.hide();
  };

  private _onTriggerClick = (): void => {
    if (this.showEvent === ShowType.mouseover) {
      this.hide(true);
      return;
    }
    if (this._listensClick) {
      if (this._openFromClick) {
        this.hide(true);
      } else {
        this._openFromClick = true;
        this.show(true);
      }
    }
  };

  firstUpdated(): void {
    this._triggerRef = this.shadowRoot?.querySelector('.swim-tooltip__trigger') as HTMLElement;
    this._panelRef = this.shadowRoot?.querySelector('.swim-tooltip__panel') as HTMLElement;
    this._caretRef = this.shadowRoot?.querySelector('.swim-tooltip__caret') as HTMLElement;
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (
      this._open &&
      (changedProperties.has('placement') || changedProperties.has('alignment') || changedProperties.has('spacing'))
    ) {
      this._position();
    }
  }

  render() {
    const hasContentSlot = this._hasContentSlot();
    const hasContent = hasContentSlot || (this.content != null && this.content !== '');
    const panelClasses = [
      'swim-tooltip__panel',
      `swim-tooltip__panel--type-${this.type}`,
      `swim-tooltip__panel--position-${this._effectivePlacement}`,
      this._animate ? 'swim-tooltip__panel--animate' : '',
      this.cssClass.includes('narrow') ? 'swim-tooltip__panel--narrow' : ''
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div
        part="trigger"
        class="swim-tooltip__trigger"
        aria-describedby="${this._open && hasContent ? this._tooltipId : nothing}"
        aria-expanded="${this._listensClick ? (this._open ? 'true' : 'false') : nothing}"
        @focusin="${this._onTriggerFocus}"
        @focusout="${this._onTriggerBlur}"
        @mouseenter="${this._onTriggerMouseEnter}"
        @mouseleave="${this._onTriggerMouseLeave}"
        @click="${this._onTriggerClick}"
      >
        <slot></slot>
      </div>

      ${this._open && hasContent
        ? html`
            <div
              part="panel"
              id="${this._tooltipId}"
              class="${panelClasses}"
              style="top: ${this._panelTop}px; left: ${this._panelLeft}px;"
              role="tooltip"
              aria-hidden="false"
              @mouseenter="${() => this._clearHideTimer()}"
              @mouseleave="${this._onPanelMouseLeave}"
            >
              ${this.showCaret
                ? html`
                    <span
                      part="caret"
                      class="swim-tooltip__caret swim-tooltip__caret--position-${this._effectivePlacement}"
                      style="top: ${this._caretTop}px; left: ${this._caretLeft}px;"
                    ></span>
                  `
                : ''}
              <div part="content" class="swim-tooltip__content">
                ${hasContentSlot ? html`<slot name="content"></slot>` : html`${unsafeHTML(this.content)}`}
              </div>
            </div>
          `
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-tooltip': SwimTooltip;
  }
}
