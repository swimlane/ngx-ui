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

  @Input() closeOnClick: boolean = true;
  @Input() closeOnOutsideClick: boolean = true;
  @Input() trigger: string = 'click';

  @ContentChild(DropdownToggleDirective)
  dropdownToggle: DropdownToggleDirective;

  @ContentChild(DropdownMenuDirective)
  dropdownMenu: DropdownMenuDirective;

  private toggleListener: any;
  private documentListener: any;

  constructor(element: ElementRef, private renderer: Renderer) {
  }

  ngAfterContentInit(): void {
    this.toggleListener = this.renderer.listen(
      this.dropdownToggle.element,
      this.trigger,
      this.onToggleClick.bind(this));
  }

  ngOnDestroy(): void {
    if(this.toggleListener) this.toggleListener();
    if(this.documentListener) this.documentListener();
  }

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

      if(this.open) {
        this.documentListener = this.renderer.listen(
          document, 'click', this.onDocumentClick.bind(this));
      } else if(this.documentListener) {
        this.documentListener();
      }
    }
  }

}
