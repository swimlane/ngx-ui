import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subject, takeUntil } from 'rxjs';
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
  @Input() height: number = 500;
  @Input() paginationConfig: ListPaginationConfig;

  @Output() onPageChange = new EventEmitter<number>();
  @Output() onScroll = new EventEmitter<number>();

  @ContentChildren(ListColumnComponent) columns: QueryList<ListColumnComponent>;
  @ContentChildren(ListHeaderComponent) headers: QueryList<ListHeaderComponent>;
  @ContentChild(ListRowComponent) row: ListRowComponent;
  @ViewChild('virtualScrollViewport') virtualScrollViewport: CdkVirtualScrollViewport;

  headerComponent = ListHeaderComponent;
  rowComponent = ListRowComponent;

  page = 1;
  hasScrollbar = false;
  _columnLayout: Partial<CSSStyleDeclaration> = {
    display: 'grid',
    gap: '1rem'
  };

  minBufferPx: number;
  maxBufferPx: number;

  private destroy$ = new Subject<void>();

  ngAfterContentInit(): void {
    this.generateLayout();
  }

  ngAfterViewInit(): void {
    this.minBufferPx = this.dataSource.length;

    setTimeout(() => {
      this.hasScrollbar =
        this.virtualScrollViewport.elementRef.nativeElement.scrollHeight >
        this.virtualScrollViewport.elementRef.nativeElement.clientHeight;

      this.initScrollListener();

      if (this.paginationConfig) {
        const { index, pageSize } = this.paginationConfig;
        if (index > 1 && pageSize > 0) {
          this.page = index - 1;
          const rowHeight = 40;
          const scrollTo = rowHeight * (pageSize * (index - 1));
          this.virtualScrollViewport.elementRef.nativeElement.scrollTo({ top: scrollTo });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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

  initScrollListener(): void {
    this.virtualScrollViewport
      .elementScrolled()
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        const scrollY: number = (event.target as HTMLElement).scrollTop;
        this.onScroll.emit(scrollY);

        const pageSize = this.paginationConfig?.pageSize;
        if (pageSize) {
          const currentRow = Math.floor(scrollY / 40);
          const page = Math.floor(currentRow / pageSize) + 1;

          if (page !== this.page) {
            this.page = page;
            this.onPageChange.emit(this.page);
          }
        }
      });
  }
}
