import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { splitAreaBaseStyles } from './split-area.styles';
import { basisToParts, partsToStyle } from './utils';
import type { FlexParts } from './utils';
import type { ISplitArea } from './split-area.interface';

const DEFAULT_BASIS = '1 1 1e-9px';

/**
 * SwimSplitArea - A flex area in a split layout. Used as a direct child of swim-split
 * with swim-split-handle between areas.
 *
 * @slot - Area content
 */
const SPLIT_AREA_TAG = 'swim-split-area';
export class SwimSplitArea extends LitElement implements ISplitArea {
  static styles = splitAreaBaseStyles;

  /**
   * Flex basis (CSS flex shorthand or just basis, e.g. "50%", "1 1 50%", "400px").
   * Default fills available space.
   */
  @property({ type: String, attribute: 'area-basis' })
  get areaBasis(): string {
    return this._areaBasis;
  }
  set areaBasis(value: string) {
    if (this._areaBasis !== value) {
      this._areaBasis = value || DEFAULT_BASIS;
      this._applyBasis();
    }
  }
  private _areaBasis = DEFAULT_BASIS;

  /** Minimum flex basis (e.g. "200px", "20%"). */
  @property({ type: String, attribute: 'min-basis' })
  minBasis: string | undefined;

  /** Maximum flex basis (e.g. "600px", "80%"). */
  @property({ type: String, attribute: 'max-basis' })
  maxBasis: string | undefined;

  /** When true, min-width/max-width are set from current basis (for edge cases). */
  @property({ type: Boolean, attribute: 'should-adjust-max-min' })
  shouldAdjustMaxMin = false;

  initialFlexParts: FlexParts = basisToParts('1', '1', DEFAULT_BASIS);
  currentFlexParts: FlexParts = basisToParts('1', '1', DEFAULT_BASIS);

  connectedCallback(): void {
    super.connectedCallback();
    this._applyBasis();
  }

  updated(): void {
    this.style.flex = partsToStyle(this.currentFlexParts);
    if (this.shouldAdjustMaxMin && this.currentFlexParts[2]) {
      this.style.minWidth = this.currentFlexParts[2];
      this.style.maxWidth = this.currentFlexParts[2];
    } else {
      this.style.minWidth = '';
      this.style.maxWidth = '';
    }
  }

  updateBasis(newBasis: string): void {
    this.currentFlexParts[2] = newBasis;
    this.requestUpdate();
  }

  private _applyBasis(): void {
    const basis = this._areaBasis || DEFAULT_BASIS;
    const [grow, shrink, basisPart] = basisToParts('1', '1', basis);
    this.currentFlexParts = [grow, shrink, basisPart];
    this.initialFlexParts = [grow, shrink, basisPart];
    if (!this.minBasis && shrink === '0') {
      this.minBasis = basisPart;
    }
    if (!this.maxBasis && grow === '0') {
      this.maxBasis = basisPart;
    }
    this.requestUpdate();
  }

  render() {
    return html`<slot></slot>`;
  }
}

if (!customElements.get(SPLIT_AREA_TAG)) {
  customElements.define(SPLIT_AREA_TAG, SwimSplitArea);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-split-area': SwimSplitArea;
  }
}
