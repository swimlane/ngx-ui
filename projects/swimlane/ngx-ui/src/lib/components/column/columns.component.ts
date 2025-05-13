import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ColumnComponent } from './column/column.component';
import { Column } from './column/column.types';

@Component({
  selector: 'ngx-columns',
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ngx-columns'
  }
})
export class ColumnsComponent implements OnChanges {
  @Input() column: Column;
  @Input() columns: Array<Column>;

  columnComponent = ColumnComponent;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.column.currentValue) {
      this.columns = this.getCurrentColumns();
    }
  }

  traverseActivePath(column: Column | undefined, columns: Array<Column>): Array<Column> {
    if (!column) {
      return [];
    }

    if (column.active) {
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
