import { Component, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { ListColumnComponent } from '../list-column/list-column.component';
import { ListRowStatus } from '../models/list-row-status.enum';

@Component({
  selector: 'ngx-list-row',
  templateUrl: './list-row.component.html',
  styleUrl: './list-row.component.scss',
  standalone: false,
  host: {
    class: 'ngx-list-row',
    '[class.ngx-list-row--error]': 'status === ListRowStatus.Error || data?.status === ListRowStatus.Error',
    '[class.ngx-list-row--success]': 'status === ListRowStatus.Success || data?.status === ListRowStatus.Success',
    '[class.ngx-list-row--warning]': 'status === ListRowStatus.Warning || data?.status === ListRowStatus.Warning',
    '[style.height.px]': 'rowHeight'
  },
  encapsulation: ViewEncapsulation.None
})
export class ListRowComponent {
  @Input() columnLayout: Partial<CSSStyleDeclaration>;
  @Input() columns: QueryList<ListColumnComponent>;
  @Input() data: Record<string, unknown>;
  @Input() index: number;
  @Input() status: ListRowStatus;
  @Input() rowHeight: number | string;

  columnComponent = ListColumnComponent;

  readonly ListRowStatus = ListRowStatus;
}
