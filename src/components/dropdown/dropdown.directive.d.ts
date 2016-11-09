import { ElementRef, Renderer } from '@angular/core';
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
export declare class DropdownDirective {
    private renderer;
    open: boolean;
    closeOnClick: boolean;
    trigger: string;
    dropdownToggle: DropdownToggleDirective;
    dropdownMenu: DropdownMenuDirective;
    private toggleListener;
    private documentListener;
    constructor(element: ElementRef, renderer: Renderer);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    onDocumentClick({target}: {
        target: any;
    }): void;
    onToggleClick(ev: any): void;
}
