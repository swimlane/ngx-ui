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
  ViewEncapsulation
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
import { getListSortDirection, getNextListSort, sortListRows } from './list-sort.utils';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ngx-list'
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

  @Output() onPageChange = new EventEmitter<number>();
  @Output() onScroll = new EventEmitter<number>();
  @Output() onSort = new EventEmitter<ListSortEvent>();

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
  hasScrollbar = false;
  page = 1;

  private _sort: ListSortPropDir | null = null;
  private destroy$ = new Subject<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sort']) {
      this._sort = this.sort ? { ...this.sort } : null;
    }

    if (changes['dataSource'] || changes['sort']) {
      this.updateDisplayDataSource();
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
        this.hasScrollbar =
          this.virtualScrollViewport.elementRef.nativeElement.scrollHeight >
          this.virtualScrollViewport.elementRef.nativeElement.clientHeight;
      } else {
        this.hasScrollbar =
          this.listRowsContainer.nativeElement.scrollHeight > this.listRowsContainer.nativeElement.clientHeight;

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

  private updateDisplayDataSource(): void {
    const rows = this.dataSource ?? [];

    if (this.externalSorting || !this._sort) {
      this.displayDataSource = [...rows];
      return;
    }

    this.displayDataSource = sortListRows(rows, this._sort, this.getHeaderList());
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
