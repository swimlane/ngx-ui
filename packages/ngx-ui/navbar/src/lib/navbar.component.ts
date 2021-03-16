import type { BooleanInput } from '@angular/cdk/coercion';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { Subscription } from 'rxjs';
import { NavbarAnimationStates } from './enums';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';
import { navbarAnimations } from './navbar.animation';

@Component({
  selector: 'ngx-navbar',
  exportAs: 'ngxNavbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [navbarAnimations.horizontalBarTransition]
})
export class NavbarComponent {
  static ngAcceptInputType_barAtTop: BooleanInput;

  @InputBoolean()
  @Input()
  barAtTop = false;

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
    }
  }

  private _active = 0;

  @Output() activeChange = new EventEmitter<number>();

  @ContentChildren(NavbarItemComponent)
  get navItems() {
    return this._navItems;
  }

  set navItems(v: QueryList<NavbarItemComponent> | undefined) {
    if (v) {
      this._navItems = v;
      if (this._navItemActiveChangeSubscription) {
        this._navItemActiveChangeSubscription.unsubscribe();
      }

      for (const item of this._navItems.map((navItem, i) => ({ navItem, i }))) {
        item.navItem.index = item.i;
        item.navItem.active = this.active;
        item.navItem.total = this._navItems.length;

        this._navItemActiveChangeSubscription = item.navItem.activeChange.subscribe(active => (this.active = active));
      }
    }
  }

  private _navItems?: QueryList<NavbarItemComponent>;
  private _navItemActiveChangeSubscription?: Subscription;

  get complete() {
    return this._navItems?.filter(s => s.index !== undefined && s.index < this.active).length || 0;
  }

  get barState() {
    return this._barState;
  }

  readonly BAR_SIZE = 40;
  private _barState = NavbarAnimationStates.Animated;

  private get _name() {
    return this.el.nativeElement.nodeName.toLowerCase();
  }

  @HostBinding('class.ngx-navbar') hostClass = true;

  constructor(private readonly el: ElementRef<HTMLElement>, private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.markForCheck();
  }

  goTo(index: number) {
    if (this.navItems && index !== this.active && index >= 0 && index < this.navItems.length) {
      const nav = this.navItems.find((_n, i) => i === index);
      if (nav) {
        nav.setActive();
      }

      // this.cdr.markForCheck();
    }
  }
}
