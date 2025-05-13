import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ColumnWrapperComponent } from './column-wrapper.component';
import { Column } from './column.types';

@Component({
  selector: 'ngx-column',
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ngx-column',
    '[class.expanded]': 'activeChild && activeChild.content'
  }
})
export class ColumnComponent implements OnChanges {
  @Input() column: Column = null;
  @Output() tabClick = new EventEmitter<{ columnId: string }>();

  columnWrapperComponent = ColumnWrapperComponent;
  activeChild: Column = null;
  list: Column[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.column) {
      if (changes.column.currentValue.children) {
        this.list = changes.column.currentValue.children;
      }
      if (changes.column.currentValue.children && changes.column.currentValue.active) {
        this.activeChild = changes.column.currentValue.children
          ? changes.column.currentValue.children?.find(child => child.active)
          : null;
      }
    }
  }

  onChildClick(columnId: string) {
    this.activeChild = this.column.children.find(child => child.id === columnId);
    this.tabClick.emit({ columnId });
  }

  onChildKeyup(event: KeyboardEvent, columnId: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.activeChild = this.column.children.find(child => child.id === columnId);
      this.tabClick.emit({ columnId });
    }
  }

  onInputChange(event: KeyboardEvent) {
    const change = (event.target as HTMLInputElement).value;
    if (!change.length) {
      this.list = this.column.children ? this.column.children : [];
    } else {
      const query = change.toLowerCase();
      const results = this.column.children.filter((child: Column) => {
        return child.title.toLowerCase().includes(query);
      });
      if (!results.length) {
        this.list = this.column.children ? this.column.children : [];
        this.activeChild = this.list.find(child => child.active);
      } else {
        this.list = results;
        if (this.activeChild && !this.list.find(child => child.id === this.activeChild.id)) {
          this.list.unshift(this.activeChild);
        }
      }
    }
  }
}
