import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { splitBaseStyles } from './split.styles';
import { SplitDirection } from './split-direction.enum';
import { resizeAreaBy } from './resize-area-by.util';
import { isPercent } from './is-percent.util';
import { basisToValue } from './basis-to-value.util';
import { getMinMaxPct } from './get-min-max-pct.util';
import type { ISplitArea } from './split-area.interface';
import type { SwimSplitArea } from './split-area.component';
import type { SwimSplitHandle } from './split-handle.component';

/**
 * SwimSplit - Resizable split layout container. Place swim-split-area and swim-split-handle
 * as direct children (e.g. area, handle, area for a two-pane split).
 *
 * @slot - Default slot for swim-split-area and swim-split-handle elements
 *
 * @fires resize - Fired when the user resizes (optional; areas update automatically)
 */
@customElement('swim-split')
export class SwimSplit extends LitElement {
  static styles = splitBaseStyles;

  /** Layout direction: row (horizontal) or column (vertical). */
  @property({ type: String, reflect: true })
  direction: SplitDirection = SplitDirection.Row;

  @query('slot') private slotEl!: HTMLSlotElement;

  private _areas: SwimSplitArea[] = [];
  private _handles: SwimSplitHandle[] = [];
  private _handleListeners = new Map<SwimSplitHandle, { drag: (e: Event) => void; dblclick: () => void }>();

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('slotchange', this._onSlotChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('slotchange', this._onSlotChange);
    this._removeHandleListeners();
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('direction')) {
      this._handles.forEach(h => {
        h.direction = this.direction;
      });
    }
  }

  firstUpdated(): void {
    // Defer so slot has assigned elements (e.g. when content is injected via innerHTML)
    requestAnimationFrame(() => {
      this._collectAreasAndHandles();
      this._attachHandleListeners();
    });
  }

  private _onSlotChange = (): void => {
    this._collectAreasAndHandles();
    this._removeHandleListeners();
    this._attachHandleListeners();
  };

  private _collectAreasAndHandles(): void {
    if (!this.slotEl) return;
    const assigned = this.slotEl.assignedElements({ flatten: true });
    this._areas = assigned.filter((el): el is SwimSplitArea => el.tagName?.toLowerCase() === 'swim-split-area');
    this._handles = assigned.filter((el): el is SwimSplitHandle => el.tagName?.toLowerCase() === 'swim-split-handle');
    this._handles.forEach(h => {
      h.direction = this.direction;
    });
  }

  private _attachHandleListeners(): void {
    this._handles.forEach(handle => {
      const drag = (e: Event) => {
        const me = (e as CustomEvent<MouseEvent>).detail;
        if (me) this._onDrag(me);
      };
      const dblclick = () => this._onDblClick();
      this._handleListeners.set(handle, { drag, dblclick });
      handle.addEventListener('drag', drag);
      handle.addEventListener('dblclick', dblclick);
    });
  }

  private _removeHandleListeners(): void {
    this._handles.forEach(handle => {
      const listeners = this._handleListeners.get(handle);
      if (listeners) {
        handle.removeEventListener('drag', listeners.drag);
        handle.removeEventListener('dblclick', listeners.dblclick);
        this._handleListeners.delete(handle);
      }
    });
  }

  private _resize(deltaPx: number): void {
    const isRow = this.direction === SplitDirection.Row;
    const totalPx = isRow ? this.clientWidth : this.clientHeight;
    const basisToPx = totalPx / 100;
    const areas = this._areas;
    if (areas.length === 0) return;

    const [first, ...rest] = areas;
    let delta = deltaPx;
    delta = resizeAreaBy(first as ISplitArea, delta, basisToPx);
    rest.forEach(area => {
      delta += resizeAreaBy(area as ISplitArea, -delta, basisToPx);
    });
  }

  private _onDrag(ev: MouseEvent): void {
    const deltaPx = this.direction === SplitDirection.Row ? ev.movementX : ev.movementY;
    this._resize(deltaPx);
  }

  private _onDblClick(): void {
    const isRow = this.direction === SplitDirection.Row;
    const totalPx = isRow ? this.clientWidth : this.clientHeight;
    const basisToPx = totalPx / 100;
    const areas = this._areas;
    const area = areas[0];
    if (!area) return;

    const [grow, shrink, basis] = area.currentFlexParts;
    const isPct = isPercent(basis);
    const basisValue = basisToValue(basis);
    const basisPx = isPct ? basisValue * basisToPx : basisValue;
    const basisPct = basisPx / basisToPx;

    const baseBasis = area.initialFlexParts[2];
    const baseBasisPct = isPercent(baseBasis) ? basisToValue(baseBasis) : basisToValue(baseBasis) / basisToPx;

    const [minBasisPct, maxBasisPct] = getMinMaxPct(
      area.minBasis,
      area.maxBasis,
      grow,
      shrink,
      baseBasisPct,
      basisToPx
    );

    const deltaMin = basisPct - minBasisPct;
    const deltaMax = maxBasisPct - basisPct;
    const delta = deltaMin < deltaMax ? deltaMax : -deltaMin;
    const deltaPx = delta * basisToPx;

    this._resize(deltaPx);
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-split': SwimSplit;
  }
}
