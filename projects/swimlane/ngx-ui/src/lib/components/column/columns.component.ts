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
  OnDestroy,
  ElementRef,
  inject,
  NgZone,
  ChangeDetectorRef
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
export class ColumnsComponent implements OnChanges, AfterViewChecked, OnDestroy {
  column = input<Column | null>(null);
  height = input<string>('');
  onColumnChange = output<ColumnTabClickEvent>();
  columnHeight = signal('');
  columns: Array<Column>;
  columnComponent = ColumnComponent;

  @ViewChildren(ColumnComponent) columnComponents!: QueryList<ColumnComponent>;
  private elementRef = inject(ElementRef);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  private scrollPositions: Map<string, number> = new Map();
  private shouldRestoreScroll = false;
  private rafId1: number | null = null;
  private rafId2: number | null = null;
  private restoreAttempts = 0;
  private readonly MAX_RESTORE_ATTEMPTS = 2;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.column?.currentValue) {
      // Save scroll positions before columns change, in case parent updates column input directly
      // Only save if we have existing columns not initial load
      if (this.columns && this.columns.length > 0) {
        this.saveScrollPositions();
      }

      this.columns = this.getCurrentColumns();
      this.scheduleScrollRestore();
    }
    if (changes.height?.currentValue) {
      this.columnHeight.set(changes.height.currentValue);
    }
  }

  ngAfterViewChecked(): void {
    // Restore scroll positions after view updates
    // Only restore if we have the expected number of column components
    if (this.shouldRestoreScroll && this.columnComponents && this.columns) {
      this.restoreScrollOnce();
    }
  }

  ngOnDestroy(): void {
    this.cancelPendingRestore();
  }

  /**
   * Schedule scroll restoration using double requestAnimationFrame
   * Runs outside Angular zone to prevent change detection cycles
   */
  private scheduleScrollRestore(): void {
    this.shouldRestoreScroll = true;
    this.restoreAttempts = 0;
    // Mark for check to ensure view updates, but don't trigger change detection in RAF callbacks
    this.cdr.markForCheck();
  }

  /**
   * Restore scroll positions once, using double requestAnimationFrame
   * Executes outside Angular zone to prevent change detection cycles
   */
  private restoreScrollOnce(): void {
    if (!this.shouldRestoreScroll) {
      return;
    }

    // Don't retry too many times
    if (this.restoreAttempts >= this.MAX_RESTORE_ATTEMPTS) {
      this.shouldRestoreScroll = false;
      this.restoreAttempts = 0;
      return;
    }

    this.restoreAttempts++;

    // Cancel any pending restoration to avoid multiple queued operations
    this.cancelPendingRestore();

    // Run outside Angular zone to prevent Zone.js from triggering change detection
    this.ngZone.runOutsideAngular(() => {
      this.rafId1 = requestAnimationFrame(() => {
        this.rafId2 = requestAnimationFrame(() => {
          const restored = this.restoreScrollPositions();
          // Only clear flag if restoration was successful or we've exhausted attempts
          if (restored || this.restoreAttempts >= this.MAX_RESTORE_ATTEMPTS) {
            this.shouldRestoreScroll = false;
            this.restoreAttempts = 0;
          }
          this.rafId1 = null;
          this.rafId2 = null;
        });
      });
    });
  }

  /**
   * Cancel any pending scroll restoration animations
   */
  private cancelPendingRestore(): void {
    if (this.rafId2 !== null) {
      cancelAnimationFrame(this.rafId2);
      this.rafId2 = null;
    }
    if (this.rafId1 !== null) {
      cancelAnimationFrame(this.rafId1);
      this.rafId1 = null;
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

  restoreScrollPositions(): boolean {
    if (!this.elementRef?.nativeElement || this.scrollPositions.size === 0) return false;

    // Match columns with viewports by column ID, not index
    // This ensures we restore to the correct column even if the order changes or components are recreated
    if (this.columnComponents && this.columns && this.columnComponents.length === this.columns.length) {
      let restoredCount = 0;
      let expectedRestoreCount = 0;

      this.columnComponents.forEach(columnComp => {
        const column = columnComp.column();
        if (column) {
          const savedScrollTop = this.scrollPositions.get(column.id);
          if (savedScrollTop !== undefined) {
            expectedRestoreCount++;
            const viewport = columnComp.virtualScrollViewport();
            if (viewport) {
              const viewportElement = viewport.elementRef.nativeElement as HTMLElement;
              // Check if viewport is ready (has content)
              if (viewportElement && viewportElement.scrollHeight > 0) {
                viewportElement.scrollTop = savedScrollTop;
                restoredCount++;
              }
            }
          }
        }
      });

      // Return true if we restored all expected positions, false otherwise
      return restoredCount > 0 && restoredCount === expectedRestoreCount;
    }

    return false;
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
    this.scheduleScrollRestore();
  }
}
