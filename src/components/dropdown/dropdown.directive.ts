import {
  Directive,
  Input,
  ContentChild,
  HostBinding,
  HostListener,
  ElementRef,
  Renderer
} from '@angular/core';

import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import './dropdown.scss';

/**
 * Dropdown control
 *
 * Example:
 *
 *  <dropdown>
 *    <dropdown-toggle>Button</dropdown-toggle>
 *    <dropdown-menu class="pull-right">
 *      <ul><li><a>...</a></li></ul>
 *    </dropdown-menu>
 *  </dropdown>
 *
 * TODOs
 *
 *  - This control needs to be optimized to
 *    only listen for click events when its open
 *
 *  - Use the `onToggle` function from the child vs
 *    the child event.
 *
 * Loosely based on:
 *  - https://github.com/pleerock/ng2-dropdown
 *  - https://github.com/valor-software/ng2-bootstrap
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

  @Input()
  closeOnClick: boolean = true;

  @ContentChild(DropdownToggleDirective)
  dropdownToggle: DropdownToggleDirective;

  @ContentChild(DropdownMenuDirective)
  dropdownMenu: DropdownMenuDirective;

  @Input()
  trigger: string = 'click';

  _listener: any;

  constructor(element: ElementRef, private renderer: Renderer) {
  }

  ngAfterContentInit() {
    this._listener = this.renderer.listen(
      this.dropdownToggle.element,
      this.trigger,
      this.onToggleClick.bind(this));
  }

  ngOnDestroy() {
    this._listener();
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target) {
    if(this.open) {
      const isToggling = this.dropdownToggle.element.contains(target);
      const isMenuClick = !this.closeOnClick && this.dropdownMenu.element.contains(target);

      if(!isToggling && !isMenuClick) {
        this.open = false;
      }
    }
  }

  onToggleClick(ev) {
    if(!this.dropdownToggle.disabled)
      this.open = !this.open;
  }

}
