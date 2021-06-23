import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { CardPlaceholderSize } from '../enums';

@Component({
  selector: 'ngx-card-placeholder',
  exportAs: 'ngxCardPlaceholder',
  template: ``,
  styleUrls: ['./card-placeholder.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPlaceholderComponent {
  @HostBinding('class.ngx-card-placeholder') hostClass = true;

  @HostBinding('class.small') get smallClass() {
    return this.size === CardPlaceholderSize.small;
  }

  @HostBinding('class.medium') get mediumClass() {
    return this.size === CardPlaceholderSize.medium;
  }

  @HostBinding('class.large') get largeClass() {
    return this.size === CardPlaceholderSize.large;
  }

  @Input('size') set _size(v: EnumKey<typeof CardPlaceholderSize>) {
    this.size = CardPlaceholderSize[v];
  }

  size = CardPlaceholderSize.medium;
}
