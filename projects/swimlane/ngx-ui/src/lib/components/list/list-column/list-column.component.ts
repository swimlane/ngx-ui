import { Component, ContentChild, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ListColumnTemplateDirective } from './list-column-template.directive';

export interface ListColumnInput {
  columnTemplate: TemplateRef<any>;
  template: TemplateRef<any>;
}

@Component({
  selector: 'ngx-list-column',
  templateUrl: './list-column.component.html',
  styleUrl: './list-column.component.scss',
  standalone: false,
  host: {
    class: 'ngx-list-column'
  },
  encapsulation: ViewEncapsulation.None
})
export class ListColumnComponent {
  @ViewChild('template', { static: true }) template: TemplateRef<any>;

  @Input() column: ListColumnInput;
  @Input() row: Record<string, unknown>;

  @ContentChild(ListColumnTemplateDirective, { read: TemplateRef, static: true })
  columnTemplate: TemplateRef<ListColumnTemplateDirective>;
}
