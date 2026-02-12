import { LitElement, html, nothing } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { drawerStyles } from './drawer.styles';
import { DrawerDirection } from './drawer-direction.enum';
import { coerceBooleanProperty, coerceNumberProperty } from '../../utils/coerce';

/**
 * SwimDrawer - Slide-in panel matching @swimlane/ngx-ui design system.
 * Can open from the left (right side of screen) or bottom.
 *
 * @slot - Drawer content (body).
 *
 * @fires close - Fired when the drawer is closed (detail: boolean | void).
 *               Listen to hide or remove the drawer from DOM.
 *
 * @csspart content - The scrollable content panel
 */
const DRAWER_TAG = 'swim-drawer';
export class SwimDrawer extends LitElement {
  static styles = drawerStyles;

  /** Extra CSS class on the host */
  @property({ type: String, attribute: 'css-class' })
  cssClass = '';

  /** Direction: left (slides from right) or bottom (slides from bottom) */
  @property({ type: String, reflect: true })
  direction: DrawerDirection | string = DrawerDirection.Left;

  /** Size as percentage (width for left, height for bottom). Default 80. */
  @property({ type: Number })
  get size(): number {
    return this._size;
  }
  set size(value: number) {
    this._size = coerceNumberProperty(value, 80);
  }
  private _size = 80;

  /** z-index for the drawer panel */
  @property({ type: Number })
  get zIndex(): number {
    return this._zIndex;
  }
  set zIndex(value: number) {
    this._zIndex = coerceNumberProperty(value, 998);
  }
  private _zIndex = 998;

  /** Whether clicking outside closes the drawer (when isRoot, uses backdrop click) */
  @property({
    type: Boolean,
    attribute: 'close-on-outside-click',
    reflect: true
  })
  get closeOnOutsideClick(): boolean {
    return this._closeOnOutsideClick;
  }
  set closeOnOutsideClick(value: boolean) {
    this._closeOnOutsideClick = coerceBooleanProperty(value);
  }
  private _closeOnOutsideClick = true;

  /** When true, drawer uses fixed positioning (viewport). When false, absolute within parent. */
  @property({ type: Boolean, attribute: 'is-root', reflect: true })
  get isRoot(): boolean {
    return this._isRoot;
  }
  set isRoot(value: boolean) {
    this._isRoot = coerceBooleanProperty(value);
  }
  private _isRoot = true;

  /** Whether the drawer is visible/open */
  @property({ type: Boolean, reflect: true })
  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    const next = coerceBooleanProperty(value);
    if (this._open !== next) {
      this._open = next;
      this.requestUpdate();
      if (next) {
        this._previousActiveElement =
          typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null;
      } else {
        this._restoreFocus();
      }
    }
  }
  private _open = false;

  @state()
  private _closing = false;

  private _closeTimeout: number | undefined;

  @state()
  private _contentId = `swim-drawer-content-${Math.random().toString(36).slice(2, 11)}`;

  @query('.swim-drawer__content')
  private _contentEl!: HTMLElement;

  private _previousActiveElement: HTMLElement | null = null;
  private _backdropClickBound = () => this._onBackdropClick();
  private _keydownBound = (e: KeyboardEvent) => this._onKeydown(e);

  private get _isLeft(): boolean {
    return this.direction === DrawerDirection.Left || this.direction === 'left';
  }

  private get _isBottom(): boolean {
    return this.direction === DrawerDirection.Bottom || this.direction === 'bottom';
  }

  private get _widthSize(): string {
    return this._isLeft && this.size ? `${this.size}%` : '100%';
  }

  private get _heightSize(): string {
    return this._isBottom && this.size ? `${this.size}%` : '100%';
  }

  private get _isVisible(): boolean {
    return this.open || this._closing;
  }

  private _restoreFocus(): void {
    if (this._previousActiveElement && typeof this._previousActiveElement.focus === 'function') {
      this._previousActiveElement.focus();
    }
    this._previousActiveElement = null;
  }

  private _emitClose(): void {
    this.dispatchEvent(new CustomEvent('close', { detail: true, bubbles: true }));
  }

  private _onBackdropClick(): void {
    if (this.closeOnOutsideClick && this.isRoot) {
      this.hide();
    }
  }

  private _onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.open) {
      e.preventDefault();
      this.hide();
    }
  }

  private _portalTarget: HTMLElement | null = null;

  /** Show the drawer */
  show(): void {
    if (this.isRoot && this.parentElement && this.parentElement !== document.body) {
      this._portalTarget = this.parentElement;
      document.body.appendChild(this);
    }
    this.open = true;
  }

  /** Hide the drawer (animates out, then emits close event) */
  hide(): void {
    if (this._closing || !this.open) return;
    this._closing = true;
    this._clearCloseTimeout();
    this._closeTimeout = window.setTimeout(() => {
      this._closeTimeout = undefined;
      this._closing = false;
      this.open = false;
      if (this._portalTarget && this._portalTarget.isConnected && this.parentElement === document.body) {
        this._portalTarget.appendChild(this);
      }
      this._portalTarget = null;
      this._emitClose();
    }, 150);
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._keydownBound);
  }

  disconnectedCallback(): void {
    document.removeEventListener('keydown', this._keydownBound);
    this._clearCloseTimeout();
    super.disconnectedCallback();
  }

  private _clearCloseTimeout(): void {
    if (this._closeTimeout !== undefined) {
      clearTimeout(this._closeTimeout);
      this._closeTimeout = undefined;
    }
  }

  protected willUpdate(): void {
    // Apply BEM classes and z-index before render so CSS matches on first paint
    const classes = [
      'swim-drawer',
      this._isLeft ? 'swim-drawer--left' : 'swim-drawer--bottom',
      this.isRoot ? 'swim-drawer--root' : 'swim-drawer--contained'
    ];
    if (this.open && !this._closing) classes.push('swim-drawer--open');
    if (this._closing) classes.push('swim-drawer--closing');
    if (this.cssClass) classes.push(...this.cssClass.trim().split(/\s+/).filter(Boolean));
    this.className = classes.join(' ');
    if (this.isRoot) {
      this.style.setProperty('--swim-drawer-z', String(this.zIndex));
    }
  }

  protected firstUpdated(): void {
    if (this.open && this._contentEl) {
      this._contentEl.focus({ preventScroll: true });
    }
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has('open') && this.open && this._contentEl) {
      requestAnimationFrame(() => {
        this._contentEl?.focus({ preventScroll: true });
      });
    }
  }

  render() {
    if (!this._isVisible) return nothing;

    return html`
      ${this.isRoot
        ? html` <div class="swim-drawer__backdrop" aria-hidden="true" @click="${this._backdropClickBound}"></div> `
        : nothing}
      <div
        class="swim-drawer__panel swim-scroll"
        style="width: ${this._widthSize}; height: ${this._heightSize}; z-index: ${this.zIndex};"
      >
        <div
          part="content"
          class="swim-drawer__content swim-scroll ${this.cssClass}"
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          id="${this._contentId}"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}

if (!customElements.get(DRAWER_TAG)) {
  customElements.define(DRAWER_TAG, SwimDrawer);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-drawer': SwimDrawer;
  }
}
