import { Component, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { ListColumnComponent } from '../list-column/list-column.component';

@Component({
  selector: 'ngx-list-row',
  templateUrl: './list-row.component.html',
  styleUrl: './list-row.component.scss',
  standalone: false,
  host: {
    class: 'ngx-list-row'
  },
  encapsulation: ViewEncapsulation.None
})
export class ListRowComponent {
  @Input() columns: QueryList<ListColumnComponent>;
  @Input() row: Record<string, unknown>;

  columnComponent = ListColumnComponent;
}
