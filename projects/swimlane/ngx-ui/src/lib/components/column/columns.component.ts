import { Component, Input, OnChanges, signal, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ColumnComponent } from './column/column.component';
import { Column } from './column/column.types';

@Component({
  selector: 'ngx-columns',
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ngx-columns',
    '[style.minHeight]': 'height ? height + "px" : "400px"',
    '[style.maxHeight]': 'height ? height + "px" : "400px"'
  }
})
export class ColumnsComponent implements OnChanges {
  @Input() column: Column;
  @Input() height: string;
  columns: Array<Column>;
  columnComponent = ColumnComponent;
  columnHeight = signal('');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.column.currentValue) {
      this.columns = this.getCurrentColumns();
    }
    if (changes.height) {
      this.columnHeight.set(changes.height.currentValue);
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
    } else {
      return columns;
    }
  }

  deactivatePath(column: Column | undefined): Array<Column> {
    if (!column) {
      return;
    }

    if (column.active) {
      column.active = false;
    }

    const activeChild = column.children?.find(child => child.active);

    if (activeChild) {
      return this.deactivatePath(activeChild);
    }
  }

  getCurrentColumns(): Array<Column> {
    const columns = [];
    return this.traverseActivePath(this.column, columns);
  }

  onColumnNavigation(col: { columnId: string }): void {
    const parentColumn = this.columns.find(parent => parent.children?.find(column => column.id === col.columnId));
    const selectedColumn = parentColumn?.children?.find(column => column.id === col.columnId);

    if (parentColumn && parentColumn.children) {
      parentColumn.children.forEach(child => this.deactivatePath(child));
      selectedColumn.active = true;
    }

    this.columns = this.getCurrentColumns();
  }
}
