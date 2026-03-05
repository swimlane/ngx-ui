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
  host: {
    class: 'ngx-card',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class CardComponent {
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
  @Input()
  disabled = false;

  @Input() orientation: CardOrientation = CardOrientation.Horizontal;

  @Input() status: CardStatus;
  @Input() statusTooltip: string;
  @Input() selectable = false;
  @Input() selected = false;
  @Input() error: boolean;
  @Input() outlineText: string;
  @Input() appearance: CardAppearance = CardAppearance.Normal;
  @Input() hideAccent = false;
  /** When true, card shows hover background and left accent on mouse hover. */
  @Input() hoverEffect = false;

  @HostBinding('class.ngx-card--hover-effect')
  get hoverEffectClass(): boolean {
    return this.hoverEffect;
  }

  @HostBinding('class.ngx-card--hovered')
  get hoveredClass(): boolean {
    return this.hoverEffect && this.isHovered;
  }

  /** True when the pointer is over the card; used with hoverEffect to show ngx-card-hover-section. */
  isHovered = false;

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

  onMouseEnter(): void {
    if (this.hoverEffect) {
      this.isHovered = true;
    }
  }

  onMouseLeave(): void {
    this.isHovered = false;
  }
}
