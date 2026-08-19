import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { ListColumnTemplateDirective } from './list-column-template.directive';
import { ListColumnAlign } from '../models/list-column-align.type';

export interface ListColumnInput {
  columnTemplate: TemplateRef<any>;
  template: TemplateRef<any>;
  align?: ListColumnAlign;
}

@Component({
  selector: 'ngx-list-column',
  templateUrl: './list-column.component.html',
  styleUrl: './list-column.component.scss',
  standalone: false,
  host: {
    class: 'ngx-list-column',
    '[style.text-align]': 'align'
  },
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Eager,
  encapsulation: ViewEncapsulation.None
})
export class ListColumnComponent {
  @ViewChild('template', { static: true }) template: TemplateRef<any>;

  @Input() column: ListColumnInput;
  @Input() data: Record<string, unknown>;
  @Input() rowIndex: number;
  @Input() depth = 0;
  @Input() align: ListColumnAlign = 'left';

  @ContentChild(ListColumnTemplateDirective, { read: TemplateRef, static: true })
  columnTemplate: TemplateRef<ListColumnTemplateDirective>;
}
