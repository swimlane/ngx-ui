import { ElementRef, Renderer } from '@angular/core';
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
export declare class DropdownDirective {
    private renderer;
    open: boolean;
    closeOnClick: boolean;
    dropdownToggle: DropdownToggleDirective;
    dropdownMenu: DropdownMenuDirective;
    trigger: string;
    _listener: any;
    constructor(element: ElementRef, renderer: Renderer);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    onDocumentClick(target: any): void;
    onToggleClick(ev: any): void;
}
