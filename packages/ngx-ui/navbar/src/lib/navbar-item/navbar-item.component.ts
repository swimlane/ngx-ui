import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';

@Component({
  selector: 'ngx-navbar-item',
  exportAs: 'ngxNavbarItem',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./navbar-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarItemComponent {
  static ngAcceptInputType_total: NumericInput;
  static ngAcceptInputType_index: NumericInput;

  @Input()
  get active() {
    return this._active;
  }

  set active(v: number | undefined) {
    if (v !== this.active) {
      this._active = coerceNumberProperty(v);
      this.activeChange.emit(this._active);
    }
  }

  private _active?: number;

  @InputNumeric()
  @Input()
  total?: number;

  @InputNumeric()
  @Input()
  index?: number;

  @Output() activeChange = new EventEmitter<number>();

  get width() {
    return this.el.nativeElement.clientWidth;
  }

  @HostBinding('class.ngx-navbar-item') hostClass = true;

  @HostBinding('class.active') get activeClass() {
    return this.active === this.index;
  }

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  @HostListener('click')
  setActive() {
    this.active = this.index;
  }
}
