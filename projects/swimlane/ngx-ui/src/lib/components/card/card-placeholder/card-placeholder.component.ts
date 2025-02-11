import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

enum CardPlaceholderSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

@Component({
  exportAs: 'ngxCardPlaceholder',
  selector: 'ngx-card-placeholder',
  template: '',
  styleUrls: ['./card-placeholder.component.scss'],
  host: {
    class: 'ngx-card-placeholder',
    '[class.small]': 'size === CardPlaceholderSize.Small',
    '[class.medium]': 'size === CardPlaceholderSize.Medium',
    '[class.large]': 'size === CardPlaceholderSize.Large'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class CardPlaceholderComponent {
  @Input() size = CardPlaceholderSize.Medium;
  readonly CardPlaceholderSize = CardPlaceholderSize;
}
