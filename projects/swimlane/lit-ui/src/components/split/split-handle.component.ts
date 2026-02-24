import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { splitHandleBaseStyles } from './split-handle.styles';
import { basisToParts, partsToStyle } from './utils';
import type { FlexParts } from './utils';
import { SplitDirection } from './split-direction.enum';

const DEFAULT_BASIS = '0 0 15px';

/**
 * SwimSplitHandle - Draggable divider between split areas. Used as a direct child of swim-split.
 * Direction is set by the parent swim-split.
 *
 * @fires drag - Fired during drag with movement (detail: MouseEvent)
 * @fires dragstart - Fired on mousedown when drag starts
 * @fires dragend - Fired on mouseup when drag ends
 * @fires dblclick - Fired on double-click (used by parent to snap to extremes)
 */
const SPLIT_HANDLE_TAG = 'swim-split-handle';
export class SwimSplitHandle extends LitElement {
  static styles = splitHandleBaseStyles;

  /**
   * Flex basis for the handle size (e.g. "15px", "5px"). Default "0 0 15px".
   */
  @property({ type: String, attribute: 'handle-basis' })
  get handleBasis(): string {
    return this._handleBasis;
  }
  set handleBasis(value: string) {
    if (this._handleBasis !== value) {
      this._handleBasis = value || DEFAULT_BASIS;
      this.currentFlexParts = basisToParts('0', '0', this._handleBasis);
      this.requestUpdate();
    }
  }
  private _handleBasis = DEFAULT_BASIS;

  /** Layout direction (set by parent swim-split). */
  @property({ type: String, reflect: true })
  direction: SplitDirection = SplitDirection.Row;

  currentFlexParts: FlexParts = basisToParts('0', '0', DEFAULT_BASIS);

  private _boundMouseUp = this._onMouseUp.bind(this);
  private _boundMouseMove = this._onMouseMove.bind(this);

  connectedCallback(): void {
    super.connectedCallback();
    this.currentFlexParts = basisToParts('0', '0', this._handleBasis || DEFAULT_BASIS);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // Clean up document listeners if handle is removed during a drag
    document.removeEventListener('mouseup', this._boundMouseUp, true);
    document.removeEventListener('mousemove', this._boundMouseMove, true);
  }

  updated(): void {
    this.style.flex = partsToStyle(this.currentFlexParts);
  }

  private _onMouseDown(ev: MouseEvent): void {
    ev.preventDefault();
    document.addEventListener('mouseup', this._boundMouseUp, true);
    document.addEventListener('mousemove', this._boundMouseMove, true);
    this.dispatchEvent(new CustomEvent('dragstart', { detail: ev, bubbles: true, composed: true }));
  }

  private _onMouseMove(ev: MouseEvent): void {
    this.dispatchEvent(new CustomEvent('drag', { detail: ev, bubbles: true, composed: true }));
  }

  private _onMouseUp(ev: MouseEvent): void {
    document.removeEventListener('mouseup', this._boundMouseUp, true);
    document.removeEventListener('mousemove', this._boundMouseMove, true);
    this.dispatchEvent(new CustomEvent('dragend', { detail: ev, bubbles: true, composed: true }));
  }

  private _onDblClick(ev: MouseEvent): void {
    this.dispatchEvent(new CustomEvent('dblclick', { detail: ev, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <button
        type="button"
        class="swim-split-handle__grip"
        aria-label="Resize split"
        @mousedown="${this._onMouseDown}"
        @dblclick="${this._onDblClick}"
      >
        <swim-icon font-icon="split-handle"></swim-icon>
      </button>
    `;
  }
}

if (!customElements.get(SPLIT_HANDLE_TAG)) {
  customElements.define(SPLIT_HANDLE_TAG, SwimSplitHandle);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-split-handle': SwimSplitHandle;
  }
}
