import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { navbarAnimations } from './navbar.animation';
import { NavbarItemComponent } from './navbar-item.component';
import { NavbarBarAnimationStates } from './navbar-bar-animation-states.enum';

import type { QueryList } from '@angular/core';

@Component({
  exportAs: 'ngxNavbar',
  selector: 'ngx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: { class: 'ngx-navbar' },
  animations: [navbarAnimations.horizontalBarTransition],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @Input()
  get barAtTop(): boolean {
    return this._barAtTop;
  }
  set barAtTop(v: boolean) {
    this._barAtTop = coerceBooleanProperty(v);
  }

  @Input()
  get active() {
    return this._active;
  }
  set active(v: number) {
    v = coerceNumberProperty(v);

    if (
      v !== undefined &&
      !isNaN(v) &&
      v !== this._active &&
      v >= 0 &&
      (!this._navItems || v < this._navItems.length)
    ) {
      this._active = v;

      if (this._navItems) {
        for (const step of this._navItems) {
          step.active = v;
        }
      }

      this.activeChange.emit(this._active);
      this._cdr.markForCheck();
    }
  }

  @Output() activeChange = new EventEmitter<number>();

  @ContentChildren(NavbarItemComponent)
  get navItems() {
    return this._navItems;
  }
  set navItems(v) {
    this._navItems = v;
    this._destroy$.next();

    for (const item of this._navItems.map((navItem, i) => ({ navItem, i }))) {
      item.navItem.index = item.i;
      item.navItem.active = this.active;
      item.navItem.total = this._navItems.length;

      item.navItem.activeChange.pipe(takeUntil(this._destroy$)).subscribe(
        /* istanbul ignore next */
        active => (this.active = active)
      );
    }

    this._cdr.markForCheck();
  }

  get complete() {
    return this._navItems.filter(s => s.index < this.active).length;
  }

  get barState() {
    return this._barState;
  }

  readonly BAR_SIZE = 40;

  private _active = 0;
  private _barAtTop = false;
  private _navItems?: QueryList<NavbarItemComponent>;
  private _barState = NavbarBarAnimationStates.Animated;
  private readonly _destroy$ = new Subject<void>();
  private get _name() {
    return this._el.nativeElement.nodeName.toLowerCase();
  }

  constructor(
    private readonly _el: ElementRef<HTMLElement>,
    private readonly _cdr: ChangeDetectorRef
  ) {
    this._el.nativeElement.classList.add(this._name);
  }

  ngAfterViewInit() {
    this._cdr.markForCheck();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  goTo(index: number) {
    if (index !== this.active && index >= 0 && index < this.navItems.length) {
      const nav = this.navItems.find((_n, i) => i === index);
      nav.setActive();

      this._cdr.markForCheck();
    }
  }
}
