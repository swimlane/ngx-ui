import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import type { EnumKey } from '@swimlane/ngx-ui/types';
import { CardPlaceholderSize } from '../enums';

@Component({
  selector: 'ngx-card-placeholder',
  template: ``,
  styleUrls: ['./card-placeholder.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'ngxCardPlaceholder',
})
export class CardPlaceholderComponent {
  @HostBinding('class.ngx-card-placeholder') hostClass = true;

  @HostBinding('class.small') get small() {
    return this.size === CardPlaceholderSize.Small;
  }

  @HostBinding('class.medium') get medium() {
    return this.size === CardPlaceholderSize.Medium;
  }

  @HostBinding('class.large') get large() {
    return this.size === CardPlaceholderSize.Large;
  }

  @InputEnum(CardPlaceholderSize)
  @Input('size')
  _size!: EnumKey<typeof CardPlaceholderSize>;
  size: CardPlaceholderSize = CardPlaceholderSize.Medium;
}
