import { Component, ContentChild, ContentChildren, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { ListRowComponent } from './list-row/list-row.component';
import { ListColumnComponent } from './list-column/list-column.component';
import { ListHeaderComponent } from './list-header/list-header.component';

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
export class ListComponent {
  @Input() dataSource: Array<Record<string, unknown>> = [];

  @ContentChildren(ListColumnComponent) columns: QueryList<ListColumnComponent>;
  @ContentChildren(ListHeaderComponent) headers: QueryList<ListHeaderComponent>;
  @ContentChild(ListRowComponent) row: ListRowComponent;

  headerComponent = ListHeaderComponent;
  rowComponent = ListRowComponent;

  ngAfterContentInit() {
    console.log(this.headers);
  }
}
