import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  exportAs: 'ngxFilterButton',
  selector: 'ngx-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class FilterButtonComponent {
  @Input() label: string = 'All Filters';
  @Input() hasFilters: boolean = false;
  @Input() filterCount: number = 0;
  @Input() disabled: boolean = false;
  @Input() showCount: boolean = true;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() showIcon: boolean = true;

  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
