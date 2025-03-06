import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { ListRowComponent } from './list-row/list-row.component';
import { ListColumnComponent } from './list-column/list-column.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListPaginationConfig } from './models/list-pagination-config';
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
export class ListComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  @Input() columnLayout: Partial<CSSStyleDeclaration>;
  @Input() dataSource: Array<Record<string, unknown>> = [];
  @Input() height: number;
  @Input() paginationConfig: ListPaginationConfig;
  @Input() virtualScroll = false;

  @Output() onPageChange = new EventEmitter<number>();
  @Output() onScroll = new EventEmitter<number>();

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
  hasScrollbar = false;
  page = 1;
  rowHeight = 44;

  private destroy$ = new Subject<void>();

  ngAfterContentInit(): void {
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
}
