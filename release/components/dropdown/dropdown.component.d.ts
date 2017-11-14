import { OnDestroy, AfterContentInit, Renderer2, ChangeDetectorRef } from '@angular/core';
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
    private cd;
    open: boolean;
    showCaret: boolean;
    closeOnClick: boolean;
    closeOnOutsideClick: boolean;
    trigger: string;
    dropdownToggle: DropdownToggleDirective;
    dropdownMenu: DropdownMenuDirective;
    private documentListener;
    constructor(renderer: Renderer2, cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    onDocumentClick({target}: {
        target: any;
    }): void;
    onToggleClick(ev: any): void;
}
