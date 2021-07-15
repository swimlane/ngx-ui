import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NgxNumericInput, NumericInput } from '@swimlane/ngx-ui/common';

@Component({
  selector: 'ngx-navbar-item',
  exportAs: 'ngxNavbarItem',
  template: ' <ng-content></ng-content> ',
  styleUrls: ['./navbar-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarItemComponent {
  static ngAcceptInputType_total: NumericInput;
  static ngAcceptInputType_index: NumericInput;
  static ngAcceptInputType_active: NumericInput;

  @HostBinding('class.ngx-navbar-item') hostClass = true;

  @Input()
  get active() {
    return this._active;
  }

  set active(v: number | undefined) {
    if (v !== this.active) {
      this._active = coerceNumberProperty(v);
      this.activeChange.emit(this._active);
      this.cdr.markForCheck();
    }
  }

  private _active?: number;

  @NgxNumericInput(0)
  @Input()
  total = 0;

  @NgxNumericInput(0)
  @Input()
  index = 0;

  @Output() activeChange = new EventEmitter<number>();

  @HostBinding('class.active') get activeClass() {
    return this.active === this.index;
  }

  get width() {
    return this.el.nativeElement.clientWidth;
  }

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly el: ElementRef<HTMLElement>
  ) {}

  @HostListener('click')
  setActive() {
    this.active = this.index;
  }
}
