import {
  AfterViewInit,
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
  ViewEncapsulation,
} from '@angular/core';
import {
  BooleanInput,
  DestroyedService,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';
import { takeUntil } from 'rxjs/operators';
import { NavbarAnimationState } from './enums';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';
import { navbarAnimations } from './navbar.animation';

@Component({
  selector: 'ngx-navbar',
  exportAs: 'ngxNavbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [navbarAnimations.horizontalBarTransition],
  providers: [DestroyedService],
})
export class NavbarComponent implements AfterViewInit {
  static ngAcceptInputType_barAtTop: BooleanInput;
  static ngAcceptInputType_active: NumericInput;

  @HostBinding('class.ngx-navbar') hostClass = true;

  @NgxBooleanInput()
  @Input()
  barAtTop = false;

  @NgxNumericInput<NavbarComponent>(
    0,
    ({ component, coercedValue, previousValue, setFn }) => {
      if (
        coercedValue !== undefined &&
        !isNaN(coercedValue) &&
        coercedValue !== previousValue &&
        coercedValue >= 0 &&
        (!component._navItems || coercedValue < component._navItems.length)
      ) {
        setFn();

        if (component._navItems) {
          for (const step of component._navItems) {
            step.active = coercedValue;
          }
        }

        component.activeChange.emit(coercedValue);
        component.cdr.markForCheck();
      }
    }
  )
  @Input()
  active = 0;

  @Output() activeChange = new EventEmitter<number>();

  @ContentChildren(NavbarItemComponent)
  get navItems() {
    return this._navItems;
  }

  set navItems(v) {
    this._navItems = v;
    this.destroyed.imperativeDestroy();

    for (const item of this._navItems?.map((navItem, i) => ({ navItem, i })) ||
      []) {
      item.navItem.index = item.i;
      item.navItem.active = this.active;
      item.navItem.total = this._navItems?.length || 0;

      item.navItem.activeChange
        .pipe(takeUntil(this.destroyed))
        .subscribe((active) => (this.active = active));
    }

    this.cdr.markForCheck();
  }

  private _navItems?: QueryList<NavbarItemComponent>;

  get complete() {
    return this._navItems?.filter((s) => s.index < this.active).length || 0;
  }

  get barState() {
    return this._barState;
  }

  private _barState = NavbarAnimationState.animated;

  readonly BAR_SIZE = 40;

  private get name() {
    return this.el.nativeElement.nodeName.toLowerCase();
  }

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyed: DestroyedService,
    private readonly el: ElementRef<HTMLElement>
  ) {
    this.el.nativeElement.classList.add(this.name);
  }

  ngAfterViewInit() {
    this.cdr.markForCheck();
  }

  goTo(index: number) {
    if (
      index !== this.active &&
      index >= 0 &&
      index < (this.navItems?.length || 0)
    ) {
      const nav = this.navItems?.find((_n, i) => i === index);
      if (nav) {
        nav.setActive();
      }

      this.cdr.markForCheck();
    }
  }
}
