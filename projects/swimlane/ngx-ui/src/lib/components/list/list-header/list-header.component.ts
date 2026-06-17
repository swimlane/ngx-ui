import { Component, ContentChild, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ListHeaderTemplateDirective } from './list-header-template.directive';
import { ListSortComparator } from '../list-sort.utils';
import { ListHeaderSortType } from '../models/list-header-sort-type.type';
import { ListSortDirection } from '../models/list-sort-direction.type';

@Component({
  selector: 'ngx-list-header',
  templateUrl: './list-header.component.html',
  styleUrl: './list-header.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ngx-list-header'
  }
})
export class ListHeaderComponent {
  @ViewChild('template', { static: true }) template: TemplateRef<any>;

  @Input() header: ListHeaderComponent;
  @Input() sortable = false;
  @Input() prop?: string;
  @Input() type?: ListHeaderSortType;
  @Input() comparator?: ListSortComparator;
  @Input() sortDir?: ListSortDirection;
  @Input() onHeaderSort?: (sourceHeader: ListHeaderComponent) => void;

  @ContentChild(ListHeaderTemplateDirective, { read: TemplateRef, static: true })
  headerTemplate: TemplateRef<ListHeaderTemplateDirective>;

  onSortClick(): void {
    const sourceHeader = this.header ?? this;
    if (sourceHeader.sortable) {
      this.onHeaderSort?.(sourceHeader);
    }
  }
}
