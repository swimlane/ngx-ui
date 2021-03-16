import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import type { EnumKey } from '@swimlane/ngx-ui/types';
import { CardOrientation, CardStatus } from './enums';

@Component({
  selector: 'ngx-card',
  exportAs: 'ngxCard',
  templateUrl: './card.component.html',
  styleUrls: ['./card-horizontal.component.scss', './card-vertical.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_selectable: BooleanInput;
  static ngAcceptInputType_selected: BooleanInput;
  static ngAcceptInputType_hideAccent: BooleanInput;

  @InputEnum(CardOrientation)
  @Input('orientation')
  _orientation!: EnumKey<typeof CardOrientation>;
  orientation = CardOrientation.Horizontal;

  @InputEnum(CardStatus)
  @Input('status')
  _status?: EnumKey<typeof CardStatus>;
  status?: CardStatus;

  @HostBinding('class.disabled')
  @InputBoolean()
  @Input()
  disabled = false;

  @Input() statusTooltip?: string;

  @InputBoolean()
  @Input()
  selectable = false;

  @InputBoolean()
  @Input()
  selected = false;

  @InputBoolean()
  @Input()
  hideAccent = false;

  @Input() outlineText?: string;

  @Output() cardSelect = new EventEmitter<boolean>();
  @Output() outlineClick = new EventEmitter<MouseEvent>();

  @HostBinding('class.ngx-card') hostClass = true;

  @HostBinding('class.ngx-card-horizontal') horizontalCard() {
    return this.orientation === CardOrientation.Horizontal;
  }

  @HostBinding('class.ngx-card-vertical') verticalCard() {
    return this.orientation === CardOrientation.Vertical;
  }

  onOutlineClick($event: MouseEvent) {
    $event.stopPropagation();
    this.outlineClick.emit($event);
  }

  onSelect($event: Event) {
    $event.stopPropagation();
    this.cardSelect.emit(($event.target as HTMLInputElement).checked);
  }
}
