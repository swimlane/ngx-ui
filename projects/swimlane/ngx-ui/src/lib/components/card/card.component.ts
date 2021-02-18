import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';

import { CardStatus } from './card-status.enum';
import { CardOrientation } from './card-orientation.enum';
import { CardAppearance } from './card-appearance.enum';

@Component({
  exportAs: 'ngxCard',
  selector: 'ngx-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  @HostBinding('class') class = 'ngx-card';

  @HostBinding('class.ngx-card-horizontal')
  get horizontal() {
    return this.orientation === CardOrientation.Horizontal;
  }

  @HostBinding('class.ngx-card-vertical')
  get vertical() {
    return this.orientation === CardOrientation.Vertical;
  }

  @HostBinding('class.flat')
  get flat() {
    return this.appearance === CardAppearance.Flat;
  }

  @HostBinding('class.disabled')
  get isDisabled() {
    return this.disabled;
  }

  @Input() orientation: CardOrientation = CardOrientation.Horizontal;
  @Input() disabled: boolean = false;
  @Input() status: CardStatus;
  @Input() statusTooltip: string;
  @Input() selectable: boolean = false;
  @Input() selected: boolean = false;
  @Input() outlineText: string;
  @Input() appearance: CardAppearance = CardAppearance.Normal;
  @Input() hideAccent: boolean = false;

  @Output() select = new EventEmitter<boolean>();
  @Output() outlineClick = new EventEmitter<void>();

  onOutlineClick($event) {
    $event.stopPropagation();
    this.outlineClick.emit();
  }

  onSelect($event) {
    $event.stopPropagation();
    this.select.emit($event.target.checked);
  }
}
