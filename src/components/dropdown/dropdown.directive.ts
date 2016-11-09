import {
  Directive, Input, ContentChild, HostBinding,
  HostListener, ElementRef, Renderer
} from '@angular/core';

import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import './dropdown.scss';

/**
 * Dropdown control
 *
 *  <swui-dropdown>
 *    <swui-dropdown-toggle>Button</dropdown-toggle>
 *    <swui-dropdown-menu class="pull-right">
 *      <ul><li><a>...</a></li></ul>
 *    </swui-dropdown-menu>
 *  </swui-dropdown>
 * 
 */
@Directive({
  selector: 'swui-dropdown',
  host: {
    class: 'swui-dropdown'
  }
})
export class DropdownDirective {

  @Input()
  @HostBinding('class.open')
  open: boolean = false;

  @Input() closeOnClick: boolean = true;
  @Input() trigger: string = 'click';

  @ContentChild(DropdownToggleDirective)
  dropdownToggle: DropdownToggleDirective;

  @ContentChild(DropdownMenuDirective)
  dropdownMenu: DropdownMenuDirective;

  private toggleListener: any;
  private documentListener: any;

  constructor(element: ElementRef, private renderer: Renderer) {
  }

  ngAfterContentInit() {
    this.toggleListener = this.renderer.listen(
      this.dropdownToggle.element,
      this.trigger,
      this.onToggleClick.bind(this));
  }

  ngOnDestroy() {
    if(this.toggleListener) this.toggleListener();
    if(this.documentListener) this.documentListener();
  }

  onDocumentClick({ target }) {
    if(this.open) {
      const isToggling = this.dropdownToggle.element.contains(target);
      const isMenuClick = !this.closeOnClick && this.dropdownMenu.element.contains(target);

      if(!isToggling && !isMenuClick) {
        this.open = false;
      }
    }
  }

  onToggleClick(ev) {
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
