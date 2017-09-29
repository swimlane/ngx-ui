import { OnDestroy, AfterContentInit, ElementRef, Renderer } from '@angular/core';
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
export declare class DropdownComponent implements AfterContentInit, OnDestroy {
    private renderer;
    open: boolean;
    closeOnClick: boolean;
    closeOnOutsideClick: boolean;
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
