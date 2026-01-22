import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  exportAs: 'ngxNavbarItem',
  selector: 'ngx-navbar-item',
  template: ' <ng-content></ng-content> ',
  styleUrls: ['./navbar-item.component.scss'],
  host: {
    class: 'ngx-navbar-item',
    '[class.active]': 'active === index',
    '(click)': 'setActive()'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class NavbarItemComponent {
  @Input()
  get active() {
    return this._active;
  }
  set active(v: number) {
    if (v !== this.active) {
      this._active = coerceNumberProperty(v);
      this.activeChange.emit(this._active);
      this._cdr.markForCheck();
    }
  }

  @Input()
  get total() {
    return this._total;
  }
  set total(v: number) {
    this._total = coerceNumberProperty(v);
    this._cdr.markForCheck();
  }

  @Input()
  get index() {
    return this._index;
  }
  set index(v: number) {
    this._index = coerceNumberProperty(v);
    this._cdr.markForCheck();
  }

  @Output() activeChange = new EventEmitter<number>();

  get width() {
    return this._el.nativeElement.clientWidth;
  }

  private _active?: number;
  private _total?: number;
  private _index?: number;

  constructor(private readonly _cdr: ChangeDetectorRef, private readonly _el: ElementRef<HTMLElement>) {}

  setActive() {
    this.active = this.index;
  }
}
