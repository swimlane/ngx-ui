import { Component, ContentChild, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ListHeaderTemplateDirective } from './list-header-template.directive';

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

  @Input() header: any;

  @ContentChild(ListHeaderTemplateDirective, { read: TemplateRef, static: true })
  headerTemplate: TemplateRef<ListHeaderTemplateDirective>;
}
