import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { listStyles } from './list.styles';
import { ListRowStatus } from './list-row-status.enum';
import type { ListPaginationConfig } from './list-pagination-config.interface';
import { coerceNumberProperty } from '../../utils/coerce';

const ROW_HEIGHT = 44;

/**
 * SwimList - A list/table component matching @swimlane/ngx-ui design system.
 * Renders a header row and data rows with configurable columns and row status.
 *
 * @fires page-change - Fired when scroll-based pagination page changes (detail: page number).
 * @fires scroll - Fired when the list body is scrolled (detail: scrollTop).
 */
@customElement('swim-list')
export class SwimList extends LitElement {
  static styles = listStyles;

  /**
   * Column layout: CSS grid-template-columns value (e.g. "1fr 1fr 1fr" or "3fr 2fr 1fr").
   */
  @property({ type: String, attribute: 'column-layout' })
  columnLayout = '';

  /**
   * Data to render; each item is a record of string keys to values.
   */
  @property({ type: Array, attribute: false })
  dataSource: Array<Record<string, unknown>> = [];

  /**
   * Fixed height in pixels for the scrollable body. Omit for auto height.
   */
  @property({ type: Number })
  get height(): number | undefined {
    return this._height;
  }
  set height(value: number | undefined) {
    this._height = value === undefined ? undefined : coerceNumberProperty(value);
  }
  private _height: number | undefined;

  /**
   * Scroll-based pagination config. When set, page-change is emitted as user scrolls.
   */
  @property({ attribute: false })
  paginationConfig?: ListPaginationConfig;

  /**
   * Default row status (left border accent). Can be overridden per row via row.status.
   */
  @property({ type: String, attribute: 'default-row-status', reflect: true })
  defaultRowStatus: ListRowStatus = ListRowStatus.Error;

  /**
   * Header labels in order (one per column).
   */
  @property({ type: Array, attribute: false })
  headerLabels: string[] = [];

  /**
   * Column keys in order. Use '$index' for row number (1-based in display).
   */
  @property({ type: Array, attribute: false })
  columns: string[] = [];

  @state()
  private _hasScrollbar = false;

  @state()
  private _page = 1;

  private _rowsContainer: HTMLDivElement | null = null;
  private _scrollBound = (e: Event) => this._emitScrollChanges(e);

  connectedCallback(): void {
    super.connectedCallback();
  }

  firstUpdated(): void {
    this._rowsContainer = this.renderRoot?.querySelector('.swim-list__rows-container') ?? null;
    if (this._rowsContainer) {
      this._rowsContainer.addEventListener('scroll', this._scrollBound);
      requestAnimationFrame(() => {
        this._updateScrollbarState();
        if (this.paginationConfig?.index && this.paginationConfig.index > 1 && this.paginationConfig.pageSize > 0) {
          this._page = this.paginationConfig.index;
          const scrollTo = ROW_HEIGHT * (this.paginationConfig.pageSize * (this._page - 1));
          this._rowsContainer!.scrollTo({ top: scrollTo });
        }
      });
    }
  }

  disconnectedCallback(): void {
    if (this._rowsContainer) {
      this._rowsContainer.removeEventListener('scroll', this._scrollBound);
      this._rowsContainer = null;
    }
    super.disconnectedCallback();
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('dataSource') || changedProperties.has('height')) {
      this._updateScrollbarState();
    }
  }

  private _updateScrollbarState(): void {
    if (!this._rowsContainer) return;
    this._hasScrollbar = this._rowsContainer.scrollHeight > this._rowsContainer.clientHeight;
  }

  private _emitScrollChanges(event: Event): void {
    const target = event.target as HTMLDivElement;
    const scrollY = target.scrollTop;
    this.dispatchEvent(new CustomEvent('scroll', { detail: scrollY, bubbles: true }));
    const pageSize = this.paginationConfig?.pageSize;
    if (pageSize) {
      const currentRow = Math.floor(scrollY / ROW_HEIGHT);
      const page = Math.floor(currentRow / pageSize) + 1;
      if (page !== this._page) {
        this._page = page;
        this.dispatchEvent(new CustomEvent('page-change', { detail: page, bubbles: true }));
      }
    }
  }

  private _getGridStyle(): string {
    const n = Math.max(this.headerLabels.length, this.columns.length, 1);
    if (this.columnLayout && this.columnLayout.trim()) {
      return this.columnLayout.trim();
    }
    return `repeat(${n}, 1fr)`;
  }

  private _getRowStatus(row: Record<string, unknown>): ListRowStatus {
    const s = row['status'];
    if (s === ListRowStatus.Error || s === ListRowStatus.Success || s === ListRowStatus.Warning) {
      return s;
    }
    return this.defaultRowStatus;
  }

  private _getCellValue(row: Record<string, unknown>, key: string, rowIndex: number): string {
    if (key === '$index') {
      return `${rowIndex + 1}.`;
    }
    const v = row[key];
    if (v === undefined || v === null) return '';
    return String(v);
  }

  render() {
    const gridStyle = this._getGridStyle();
    const colCount = Math.max(this.headerLabels.length, this.columns.length, 1);
    const headers =
      this.headerLabels.length >= colCount
        ? this.headerLabels.slice(0, colCount)
        : [...this.headerLabels, ...Array(colCount - this.headerLabels.length).fill('')];

    return html`
      <div
        class="swim-list__headers-container ${this._hasScrollbar ? 'swim-list__headers-container--scrollable' : ''}"
        style="grid-template-columns: ${gridStyle}"
      >
        ${headers.map(label => html`<span class="swim-list__header-cell">${label}</span>`)}
      </div>
      <hr class="swim-list__divider" />
      <div class="swim-list__rows-container" style=${this._height !== undefined ? `height: ${this._height}px` : ''}>
        ${this.dataSource.map((row, idx) => {
          const status = this._getRowStatus(row);
          return html`
            <div class="swim-list__row swim-list__row--${status}" style="grid-template-columns: ${gridStyle}">
              ${this.columns.map(
                key => html` <span class="swim-list__cell">${this._getCellValue(row, key, idx)}</span> `
              )}
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-list': SwimList;
  }
}
