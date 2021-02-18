import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { CardStatus } from './card-status.enum';
import { CardOrientation } from './card-orientation.enum';
import { CardAppearance } from './card-appearance.enum';

@Component({
  exportAs: 'ngxCard',
  selector: 'ngx-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: {
    class: 'ngx-card',
    '[class.ngx-card-horizontal]': 'orientation === CardOrientation.Horizontal',
    '[class.ngx-card-vertical]': 'orientation === CardOrientation.Vertical',
    '[class.flat]': 'appearance === CardAppearance.Flat',
    '[class.disabled]': 'disabled'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
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

  readonly CardOrientation = CardOrientation;
  readonly CardAppearance = CardAppearance;

  onOutlineClick($event) {
    $event.stopPropagation();
    this.outlineClick.emit();
  }

  onSelect($event) {
    $event.stopPropagation();
    this.select.emit($event.target.checked);
  }
}
