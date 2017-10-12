import {
  Component, Input, ContentChild, HostBinding, OnDestroy, AfterContentInit,
  HostListener, ElementRef, Renderer, ViewEncapsulation
} from '@angular/core';

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
  selector: 'ngx-dropdown',
  host: {
    class: 'ngx-dropdown'
  },
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements AfterContentInit, OnDestroy {

  @Input()
  @HostBinding('class.open')
  open: boolean = false;

  @Input()
  @HostBinding('class.has-caret')
  showCaret: boolean = false;

  @Input() closeOnClick: boolean = true;
  @Input() closeOnOutsideClick: boolean = true;
  @Input() trigger: string = 'click';

  @ContentChild(DropdownToggleDirective)
  dropdownToggle: DropdownToggleDirective;

  @ContentChild(DropdownMenuDirective)
  dropdownMenu: DropdownMenuDirective;

  private toggleListener: any;
  private documentListener: any;

  ngAfterContentInit(): void {
    this.dropdownToggle.toggle.subscribe(ev => this.onToggleClick(ev));
  }

  ngOnDestroy(): void {
    if(this.toggleListener) this.toggleListener();
    if(this.documentListener) this.documentListener();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick({ target }): void {
    if(this.open && this.closeOnOutsideClick) {
      const isToggling = this.dropdownToggle.element.contains(target);
      const isMenuClick = !this.closeOnClick && this.dropdownMenu.element.contains(target);

      if(!isToggling && !isMenuClick) {
        this.open = false;
      }
    }
  }

  onToggleClick(ev): void {
    if(!this.dropdownToggle.disabled) {
      this.open = !this.open;
    }
  }

}
