import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { ListRowComponent } from './list-row/list-row.component';
import { ListColumnComponent } from './list-column/list-column.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListPaginationConfig } from './models/list-pagination-config';
import { ListSortEvent } from './models/list-sort-event';
import { ListSortPropDir } from './models/list-sort-prop-dir';
import { ListSortDirection } from './models/list-sort-direction.type';
import { ListColumnAlign } from './models/list-column-align.type';
import { ListNestMode } from './models/list-nest-mode.type';
import { LIST_DEPTH_KEY, LIST_PARENT_ID_KEY, ListRowId } from './models/list-item.model';
import { ListSelectionEvent } from './models/list-selection-event';
import { getListSortDirection, getNextListSort, sortListRows } from './list-sort.utils';
import { flattenListDataSource, getListRowId } from './list-nest.utils';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'ngx-list',
    '[class.ngx-list--selectable]': 'selectable'
  }
})
export class ListComponent implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() columnLayout: Partial<CSSStyleDeclaration>;
  @Input() dataSource: Array<Record<string, unknown>> = [];
  @Input() externalSorting = false;
  @Input() sort: ListSortPropDir | null = null;
  @Input() height: number;
  @Input() paginationConfig: ListPaginationConfig;
  @Input() virtualScroll = false;
  @Input() rowHeight = 40;
  @Input() selectable = false;
  @Input() showSelectAll = true;
  @Input() selectedIds: ListRowId[] = [];
  @Input() nestIndent = 20;
  @Input() indentColumn = 0;
  @Input() nestMode: ListNestMode = 'stagger';

  @Output() onPageChange = new EventEmitter<number>();
  @Output() onScroll = new EventEmitter<number>();
  @Output() onSort = new EventEmitter<ListSortEvent>();
  @Output() selectedIdsChange = new EventEmitter<ListRowId[]>();
  @Output() onSelectionChange = new EventEmitter<ListSelectionEvent>();

  @ContentChild(ListRowComponent) row: ListRowComponent;

  @ContentChildren(ListColumnComponent) columns: QueryList<ListColumnComponent>;
  @ContentChildren(ListHeaderComponent) headers: QueryList<ListHeaderComponent>;

  @ViewChild('listRowsContainer') listRowsContainer: ElementRef<HTMLDivElement>;
  @ViewChild('virtualScrollViewport') virtualScrollViewport: CdkVirtualScrollViewport;

  headerComponent = ListHeaderComponent;
  rowComponent = ListRowComponent;

  _columnLayout: Partial<CSSStyleDeclaration> = {
    display: 'grid',
    gap: '1rem'
  };
  displayDataSource: Array<Record<string, unknown>> = [];
  isNested = false;
  maxDepth = 0;
  hasScrollbar = false;
  scrollbarWidth = 0;
  page = 1;
  allRowsSelected = false;
  someRowsSelected = false;

  private _sort: ListSortPropDir | null = null;
  private destroy$ = new Subject<void>();
  private selectableIds: ListRowId[] = [];
  private selectedIdSet = new Set<ListRowId>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sort']) {
      this._sort = this.sort ? { ...this.sort } : null;
    }

    if (changes['dataSource'] || changes['sort']) {
      this.updateDisplayDataSource();
    }

    if (changes['selectedIds'] || changes['selectable']) {
      this.refreshSelectionState();
    }
  }

  ngAfterContentInit(): void {
    this._sort = this.sort ? { ...this.sort } : null;
    this.updateDisplayDataSource();
    this.generateLayout();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initScrollListener();

      if (this.virtualScroll) {
        this.measureScrollbar(this.virtualScrollViewport.elementRef.nativeElement);
      } else {
        this.measureScrollbar(this.listRowsContainer.nativeElement);

        if (this.paginationConfig) {
          const { index, pageSize } = this.paginationConfig;
          if (index > 1 && pageSize > 0) {
            this.page = index - 1;
            const scrollTo = this.rowHeight * (pageSize * this.page);
            this.listRowsContainer.nativeElement.scrollTo({ top: scrollTo });
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSortDirection(header: ListHeaderComponent): ListSortDirection | undefined {
    return getListSortDirection(this._sort, header.prop);
  }

  getColumnAlign = (columnIndex: number): ListColumnAlign => {
    if (this.isNested && this.nestMode === 'stagger') {
      return columnIndex === this.indentColumn ? 'left' : 'center';
    }
    return this.columns?.get(columnIndex)?.align ?? 'left';
  };

  get headersPaddingLeft(): string | null {
    const staggered = this.isNested && this.nestMode === 'stagger';
    const offset = staggered ? Math.round((this.maxDepth * (this.nestIndent ?? 0)) / 2) : 0;
    if (!offset) {
      return null;
    }
    return this.selectable ? `${offset}px` : `calc(1rem + ${offset}px)`;
  }

  get headersMarginRight(): string | null {
    return this.scrollbarWidth > 0 ? `calc(1rem + ${this.scrollbarWidth}px)` : null;
  }

  /**
   * @function onHeaderSort
   *
   * @description
   * Handles sortable header clicks by updating sort state, emitting `onSort`, and applying local sorting when enabled.
   *
   * @param {ListHeaderComponent} header - the clicked header
   */
  onHeaderSort = (header: ListHeaderComponent): void => {
    if (!header.sortable || !header.prop) {
      return;
    }

    this._sort = getNextListSort(this._sort, header);
    this.onSort.emit({
      sort: this._sort ? { ...this._sort } : null
    });

    if (!this.externalSorting) {
      this.updateDisplayDataSource();
    }

    this.resetScrollAfterSort();
  };

  /**
   * @function emitScrollChanges
   *
   * @description
   * Emits the `onScroll` event. Additionally, if the `paginationConfig` input is provided, emits the `onPageChange` event.
   *
   * @param {Event} event - the scroll event
   */
  emitScrollChanges(event: Event): void {
    const scrollY = (event.target as HTMLDivElement).scrollTop;
    this.onScroll.emit(scrollY);

    const pageSize = this.paginationConfig?.pageSize;
    if (pageSize) {
      const currentRow = Math.floor(scrollY / this.rowHeight);
      const page = Math.floor(currentRow / pageSize) + 1;

      if (page !== this.page) {
        this.page = page;
        this.onPageChange.emit(this.page);
      }
    }
  }

  /**
   * @function generateLayout
   *
   * @description
   * Generates the column layout styling.
   */
  generateLayout(): void {
    if (!this.columnLayout || Object.keys(this.columnLayout).length === 0) {
      this._columnLayout = {
        ...this._columnLayout,
        gridTemplateColumns: `repeat(${this.headers.length}, 1fr)`
      };
    } else {
      this._columnLayout = {
        ...this._columnLayout,
        ...this.columnLayout
      };
    }
  }

  /**
   * @function initScrollListener
   *
   * @description
   * Initializes the appropriate scroll listener.
   */
  initScrollListener(): void {
    if (this.virtualScroll) {
      this.virtualScrollViewport
        .elementScrolled()
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => this.emitScrollChanges(event));
    } else {
      fromEvent(this.listRowsContainer.nativeElement, 'scroll')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => this.emitScrollChanges(event));
    }
  }

  isRowSelectable = (data: Record<string, unknown>): boolean => {
    return this.selectable && data?.selectable !== false;
  };

  isRowSelected = (data: Record<string, unknown>, index: number): boolean => {
    return this.selectedIdSet.has(getListRowId(data, index));
  };

  onRowCheckedChange = (data: Record<string, unknown>, index: number, selected: boolean): void => {
    if (!this.isRowSelectable(data) || data?.disabled === true) {
      return;
    }

    const id = getListRowId(data, index);
    // Ignore no-op echoes from rebinding `[checked]`.
    if (this.selectedIdSet.has(id) === selected) {
      return;
    }

    const next = new Set(this.selectedIdSet);
    if (selected) {
      next.add(id);
    } else {
      next.delete(id);
    }

    this.applySelection(Array.from(next), { row: data, selected });
  };

  onSelectAllChange(selected: boolean): void {
    if (selected === this.allRowsSelected) {
      return;
    }

    this.applySelection(selected ? [...this.selectableIds] : []);
  }

  private applySelection(selectedIds: ListRowId[], change?: Pick<ListSelectionEvent, 'row' | 'selected'>): void {
    this.selectedIds = selectedIds;
    this.refreshSelectionState();
    this.selectedIdsChange.emit(selectedIds);
    this.onSelectionChange.emit({ selectedIds, ...change });
  }

  private refreshSelectionState(): void {
    this.selectedIdSet = new Set(this.selectedIds ?? []);

    const total = this.selectableIds.length;
    let selectedCount = 0;
    for (const id of this.selectableIds) {
      if (this.selectedIdSet.has(id)) {
        selectedCount++;
      }
    }

    this.allRowsSelected = total > 0 && selectedCount === total;
    this.someRowsSelected = selectedCount > 0 && selectedCount < total;
  }

  private updateDisplayDataSource(): void {
    const rows = flattenListDataSource(this.dataSource ?? []);

    if (this.externalSorting || !this._sort) {
      this.displayDataSource = rows;
    } else {
      this.displayDataSource = this.sortFlattenedRows(rows);
    }

    this.maxDepth = this.displayDataSource.reduce(
      (deepest, row) => Math.max(deepest, (row[LIST_DEPTH_KEY] as number) ?? 0),
      0
    );
    this.isNested = this.maxDepth > 0;

    this.selectableIds = this.displayDataSource
      .map((row, index) => ({ row, id: getListRowId(row, index) }))
      .filter(({ row }) => row?.selectable !== false && row?.disabled !== true)
      .map(({ id }) => id);

    this.refreshSelectionState();
  }

  private sortFlattenedRows(rows: Array<Record<string, unknown>>): Array<Record<string, unknown>> {
    if (!this._sort) {
      return rows;
    }

    const roots = rows.filter(row => (row[LIST_DEPTH_KEY] as number) === 0);
    if (!roots.length) {
      return sortListRows(rows, this._sort, this.getHeaderList());
    }

    // Sort roots only; keep relative child order under each root.
    const childrenByParent = new Map<string, Array<Record<string, unknown>>>();
    rows.forEach(row => {
      const depth = row[LIST_DEPTH_KEY] as number;
      if (!depth) {
        return;
      }
      const parentId = String(row[LIST_PARENT_ID_KEY]);
      const bucket = childrenByParent.get(parentId) ?? [];
      bucket.push(row);
      childrenByParent.set(parentId, bucket);
    });

    const sortedRoots = sortListRows(roots, this._sort, this.getHeaderList());
    const result: Array<Record<string, unknown>> = [];
    const appendWithChildren = (row: Record<string, unknown>): void => {
      result.push(row);
      const id = String(getListRowId(row));
      (childrenByParent.get(id) ?? []).forEach(appendWithChildren);
    };
    sortedRoots.forEach(appendWithChildren);
    return result;
  }

  private measureScrollbar(element: HTMLElement): void {
    this.scrollbarWidth = Math.max(element.offsetWidth - element.clientWidth, 0);
    this.hasScrollbar = this.scrollbarWidth > 0;
  }

  private getHeaderList(): ListHeaderComponent[] {
    return this.headers?.toArray?.() ?? [];
  }

  private resetScrollAfterSort(): void {
    this.page = 1;

    if (this.virtualScroll && this.virtualScrollViewport) {
      this.virtualScrollViewport.scrollToIndex(0);
      return;
    }

    if (this.listRowsContainer?.nativeElement) {
      this.listRowsContainer.nativeElement.scrollTo({ top: 0 });
    }
  }
}
