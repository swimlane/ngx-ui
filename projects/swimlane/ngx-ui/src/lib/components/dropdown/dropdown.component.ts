import {
  Component,
  Input,
  ContentChild,
  OnDestroy,
  AfterContentInit,
  Renderer2,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InViewportMetadata } from 'ng-in-viewport';

@Component({
  exportAs: 'ngxDropdown',
  selector: 'ngx-dropdown',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./dropdown.component.scss'],
  host: {
    class: 'ngx-dropdown',
    '[class.open]': 'open',
    '[class.has-caret]': 'showCaret'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements AfterContentInit, OnDestroy {
  destroy$ = new Subject();

  @Input()
  get open() {
    return this._open;
  }
  set open(open: boolean) {
    this._open = coerceBooleanProperty(open);
  }

  @Input()
  get showCaret() {
    return this._showCaret;
  }
  set showCaret(showCaret: boolean) {
    this._showCaret = coerceBooleanProperty(showCaret);
  }

  @Input()
  get closeOnClick() {
    return this._closeOnClick;
  }
  set closeOnClick(closeOnClick: boolean) {
    this._closeOnClick = coerceBooleanProperty(closeOnClick);
  }

  @Input()
  get closeOnOutsideClick() {
    return this._closeOnOutsideClick;
  }
  set closeOnOutsideClick(closeOnOutsideClick: boolean) {
    this._closeOnOutsideClick = coerceBooleanProperty(closeOnOutsideClick);
  }

  @Input()
  get closeOnMouseLeave() {
    return this._closeOnMouseLeave;
  }
  set closeOnMouseLeave(val: boolean) {
    this._closeOnMouseLeave = coerceBooleanProperty(val);
  }

  @ContentChild(DropdownToggleDirective) readonly dropdownToggle: DropdownToggleDirective;
  @ContentChild(DropdownMenuDirective) readonly dropdownMenu: DropdownMenuDirective;

  private _documentListener?: () => void;
  private _open: boolean = false;
  private _showCaret: boolean = false;
  private _closeOnClick: boolean = true;
  private _closeOnOutsideClick: boolean = true;
  private _closeOnMouseLeave: boolean = false;
  private _leaveTimeout = null;

  constructor(private readonly renderer: Renderer2, private readonly cd: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    if (this.dropdownToggle) {
      this.dropdownToggle.toggle.subscribe((ev: Event) => this.onToggleClick(ev));
    }

    if (this.dropdownMenu) {
      this.dropdownMenu.options = { partial: false };
      this.dropdownMenu
        .getCallbackFn()
        .pipe(takeUntil(this.destroy$))
        // tslint:disable-next-line: deprecation
        .subscribe({ next: this.adjustMenuDirection.bind(this) });
    }
  }

  adjustMenuDirection(event: {
    [InViewportMetadata]: { entry: IntersectionObserverEntry };
    target: HTMLElement;
    visible: boolean;
  }): void {
    if (!event.visible && this.open) {
      if (this.isIntersectingBottom(event[InViewportMetadata].entry)) {
        this.renderer.addClass(this.dropdownMenu.element, 'ngx-dropdown-menu--upwards');
      } else {
        this.renderer.removeClass(this.dropdownMenu.element, 'ngx-dropdown-menu--upwards');
      }
    }
  }

  isIntersectingBottom(entry: IntersectionObserverEntry): boolean {
    return entry.boundingClientRect.bottom >= entry.rootBounds.bottom;
  }

  ngOnDestroy(): void {
    if (this._documentListener) this._documentListener();
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDocumentClick(e: Event): void {
    if (this.open && this.closeOnOutsideClick) {
      const isToggling = this.dropdownToggle.element.contains(e.target as Node);
      const isMenuClick = !this.closeOnClick && this.dropdownMenu.element.contains(e.target as Node);

      if (!isToggling && !isMenuClick) {
        this.close();
      }
    }
  }

  onToggleClick(_: Event): void {
    this.open = !this.open;

    if (this.open) {
      this._documentListener = this.renderer.listen(document, 'click', this.onDocumentClick.bind(this));
    } else {
      this._documentListener();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.closeOnMouseLeave) {
      this._leaveTimeout = setTimeout(() => {
        this.close();
      }, 1000);
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this._leaveTimeout) {
      clearTimeout(this._leaveTimeout);
    }
  }

  private close() {
    if (this.dropdownMenu) {
      this.renderer.removeClass(this.dropdownMenu.element, 'ngx-dropdown-menu--upwards');
    }
    this.open = false;
    if (this._documentListener) this._documentListener();
    this.cd.markForCheck();
  }
}
