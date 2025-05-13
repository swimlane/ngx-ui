import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Column } from './column.types';

@Component({
  selector: 'ngx-column-wrapper',
  templateUrl: './column-wrapper.component.html',
  styleUrl: './column-wrapper.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ngx-column-wrapper'
  }
})
export class ColumnWrapperComponent {
  @Input() column: Column = null;
}
