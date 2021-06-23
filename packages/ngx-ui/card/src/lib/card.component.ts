import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { CardAppearance, CardOrientation, CardStatus } from './enums';

@Component({
  selector: 'ngx-card',
  exportAs: 'ngxCard',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_selectable: BooleanInput;
  static ngAcceptInputType_selected: BooleanInput;
  static ngAcceptInputType_error: BooleanInput;
  static ngAcceptInputType_hideAccent: BooleanInput;

  @HostBinding('class.ngx-card') hostClass = true;

  @HostBinding('class.ngx-card-horizontal')
  get horizontal() {
    return this.orientation === CardOrientation.horizontal;
  }

  @HostBinding('class.ngx-card-vertical')
  get vertical() {
    return this.orientation === CardOrientation.vertical;
  }

  @HostBinding('class.flat')
  get flat() {
    return this.appearance === CardAppearance.flat;
  }

  @HostBinding('class.disabled')
  @NgxBooleanInput()
  @Input()
  disabled = false;

  @Input('orientation') set _orientation(v: EnumKey<typeof CardOrientation>) {
    this.orientation = CardOrientation[v];
  }

  orientation = CardOrientation.horizontal;

  @Input('status') set _status(v: EnumKey<typeof CardStatus>) {
    this.status = CardStatus[v];
  }

  status?: CardStatus;

  @Input() statusTooltip = '';

  @NgxBooleanInput()
  @Input()
  selectable = false;

  @NgxBooleanInput()
  @Input()
  selected = false;

  @NgxBooleanInput()
  @Input()
  error = false;

  @Input() outlineText = '';

  @Input('appearance') set _appearance(v: EnumKey<typeof CardAppearance>) {
    this.appearance = CardAppearance[v];
  }

  appearance = CardAppearance.normal;

  @NgxBooleanInput()
  @Input()
  hideAccent = false;

  @Output() cardSelect = new EventEmitter<boolean>();
  @Output() cardOutlineClick = new EventEmitter<MouseEvent>();

  onOutlineClick($event: MouseEvent) {
    $event.stopPropagation();
    this.cardOutlineClick.emit($event);
  }

  onSelect($event: Event) {
    $event.stopPropagation();
    this.cardSelect.emit(($event.target as HTMLInputElement).checked);
  }
}
