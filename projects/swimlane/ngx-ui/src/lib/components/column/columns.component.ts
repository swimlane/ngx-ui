import {
  Component,
  input,
  OnChanges,
  output,
  signal,
  SimpleChanges,
  ViewEncapsulation,
  ViewChildren,
  QueryList,
  AfterViewChecked,
  ElementRef,
  inject
} from '@angular/core';
import { ColumnComponent, ColumnTabClickEvent } from './column/column.component';
import { Column } from './column/column.types';

@Component({
  selector: 'ngx-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ngx-columns',
    '[style.minHeight]': 'height ? height + "px" : "400px"',
    '[style.maxHeight]': 'height ? height + "px" : "400px"'
  }
})
export class ColumnsComponent implements OnChanges, AfterViewChecked {
  column = input<Column | null>(null);
  height = input<string>('');
  onColumnChange = output<ColumnTabClickEvent>();
  columnHeight = signal('');
  columns: Array<Column>;
  columnComponent = ColumnComponent;

  @ViewChildren(ColumnComponent) columnComponents!: QueryList<ColumnComponent>;
  private elementRef = inject(ElementRef);

  private scrollPositions: Map<string, number> = new Map();
  private shouldRestoreScroll = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.column?.currentValue) {
      // Save scroll positions before columns change, in case parent updates column input directly
      // Only save if we have existing columns not initial load
      if (this.columns && this.columns.length > 0) {
        this.saveScrollPositions();
      }

      this.columns = this.getCurrentColumns();
      this.shouldRestoreScroll = true;
    }
    if (changes.height?.currentValue) {
      this.columnHeight.set(changes.height.currentValue);
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldRestoreScroll) {
      // Use double requestAnimationFrame to ensure DOM and virtual scroll are fully rendered
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.restoreScrollPositions();
          this.shouldRestoreScroll = false;
        });
      });
    }
  }

  saveScrollPositions(): void {
    if (!this.elementRef?.nativeElement) return;

    // Use component references to match by column ID (more reliable when components are recreated)
    if (this.columnComponents && this.columns && this.columnComponents.length > 0) {
      this.columnComponents.forEach(columnComp => {
        const column = columnComp.column();
        if (column) {
          const viewportRef = columnComp.virtualScrollViewport();
          if (viewportRef) {
            const viewportElement = viewportRef.elementRef.nativeElement as HTMLElement;
            const scrollTop = viewportElement.scrollTop ?? 0;
            this.scrollPositions.set(column.id, scrollTop);
          }
        }
      });
    }
  }

  restoreScrollPositions(): void {
    if (!this.elementRef?.nativeElement || this.scrollPositions.size === 0) return;

    // Match columns with viewports by column ID, not index
    // This ensures we restore to the correct column even if the order changes or components are recreated
    if (this.columnComponents && this.columns) {
      this.columnComponents.forEach(columnComp => {
        const column = columnComp.column();
        if (column) {
          const savedScrollTop = this.scrollPositions.get(column.id);
          if (savedScrollTop !== undefined) {
            const viewport = columnComp.virtualScrollViewport();
            if (viewport) {
              const viewportElement = viewport.elementRef.nativeElement as HTMLElement;
              if (viewportElement && viewportElement.scrollHeight > 0) {
                viewportElement.scrollTop = savedScrollTop;
              }
            }
          }
        }
      });
    }
  }

  traverseActivePath(column: Column | undefined, columns: Array<Column>): Array<Column> {
    if (!column) {
      return [];
    }

    if (column.active && !column.content) {
      columns.push(column);
    }

    const activeChild = column.children?.find(child => child.active);

    if (activeChild) {
      return this.traverseActivePath(activeChild, columns);
    }

    return columns;
  }

  deactivatePath(column: Column | undefined): void {
    if (!column) {
      return;
    }

    if (column.active) {
      column.active = false;
    }

    const activeChild = column.children?.find(child => child.active);

    if (activeChild) {
      this.deactivatePath(activeChild);
    }
  }

  getCurrentColumns(): Array<Column> {
    const columns = [];
    return this.traverseActivePath(this.column(), columns);
  }

  onColumnNavigation(event: ColumnTabClickEvent): void {
    // Save scroll positions BEFORE making any changes
    this.saveScrollPositions();

    const parentColumn = this.columns.find(parent => parent.children?.find(column => column.id === event.columnId));
    const selectedColumn = parentColumn?.children?.find(column => column.id === event.columnId);

    if (parentColumn && parentColumn.children) {
      parentColumn.children.forEach(child => this.deactivatePath(child));
      selectedColumn.active = true;
    }

    this.onColumnChange.emit(event);
    this.columns = this.getCurrentColumns();
    this.shouldRestoreScroll = true;
  }
}
