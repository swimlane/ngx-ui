import {
  Component,
  Input,
  ContentChild,
  OnDestroy,
  AfterContentInit,
  Renderer2,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';

/**
 * Dropdown control
 *
 *  <ngx-dropdown>
 *    <ngx-dropdown-toggle>Button</dropdown-toggle>
 *    <ngx-dropdown-menu class="pull-right">
 *      <ul><li><a>...</a></li></ul>
 *    </ngx-dropdown-menu>
 *  </ngx-dropdown>
 *
 */
@Component({
  exportAs: 'ngxDropdown',
  selector: 'ngx-dropdown',
  template: `<ng-content></ng-content>`,
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
  @Input()
  get open() { return this._open; }
  set open(open: boolean) {
    this._open = coerceBooleanProperty(open);
  }

  @Input()
  get showCaret() { return this._showCaret; }
  set showCaret(showCaret: boolean) {
    this._showCaret = coerceBooleanProperty(showCaret);
  }

  @Input()
  get closeOnClick() { return this._closeOnClick; }
  set closeOnClick(closeOnClick: boolean) {
    this._closeOnClick = coerceBooleanProperty(closeOnClick);
  }

  @Input()
  get closeOnOutsideClick() { return this._closeOnOutsideClick; }
  set closeOnOutsideClick(closeOnOutsideClick: boolean) {
    this._closeOnOutsideClick = coerceBooleanProperty(closeOnOutsideClick);
  }

  @ContentChild(DropdownToggleDirective, { static: false })
  readonly dropdownToggle: DropdownToggleDirective;

  @ContentChild(DropdownMenuDirective, { static: false })
  readonly dropdownMenu: DropdownMenuDirective;

  private _documentListener?: () => void;
  private _open: boolean = false;
  private _showCaret: boolean = false;
  private _closeOnClick: boolean = true;
  private _closeOnOutsideClick: boolean = true;

  constructor(
    private readonly renderer: Renderer2,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    if (this.dropdownToggle) {
      this.dropdownToggle.toggle.subscribe(ev => this.onToggleClick(ev));
    }
  }

  ngOnDestroy(): void {
    if (this._documentListener) this._documentListener();
  }

  onDocumentClick({ target }): void {
    if (this.open && this.closeOnOutsideClick) {
      const isToggling = this.dropdownToggle.element.contains(target);
      const isMenuClick = !this.closeOnClick && this.dropdownMenu.element.contains(target);

      if (!isToggling && !isMenuClick) {
        this.open = false;
        if (this._documentListener) this._documentListener();
        this.cd.markForCheck();
      }
    }
  }

  onToggleClick(_: Event): void {
    if (!this.dropdownToggle.disabled) {
      this.open = !this.open;

      if (this.open) {
        this._documentListener = this.renderer.listen(document, 'click', $event => this.onDocumentClick($event));
      } else if (this._documentListener) {
        this._documentListener();
      }
    }
  }
}
