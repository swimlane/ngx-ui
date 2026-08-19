import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { ListHeaderTemplateDirective } from './list-header-template.directive';
import { ListSortComparator } from '../list-sort.utils';
import { ListHeaderSortType } from '../models/list-header-sort-type.type';
import { ListSortDirection } from '../models/list-sort-direction.type';
import { ListColumnAlign } from '../models/list-column-align.type';

@Component({
  selector: 'ngx-list-header',
  templateUrl: './list-header.component.html',
  styleUrl: './list-header.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'ngx-list-header',
    '[style.text-align]': 'align'
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
  @Input() align: ListColumnAlign = 'left';

  @ContentChild(ListHeaderTemplateDirective, { read: TemplateRef, static: true })
  headerTemplate: TemplateRef<ListHeaderTemplateDirective>;

  get justifyContent(): string {
    if (this.align === 'center') {
      return 'center';
    }
    return this.align === 'right' ? 'flex-end' : 'flex-start';
  }

  onSortClick(): void {
    const sourceHeader = this.header ?? this;
    if (sourceHeader.sortable) {
      this.onHeaderSort?.(sourceHeader);
    }
  }
}
