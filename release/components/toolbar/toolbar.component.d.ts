import { EventEmitter } from '@angular/core';
import { ToolbarTitleDirective } from './toolbar-title.directive';
import { ToolbarContentDirective } from './toolbar-content.directive';
export declare class ToolbarComponent {
    title: string;
    subtitle: string;
    menu: any;
    menuClick: EventEmitter<{}>;
    toolbarTitle: ToolbarTitleDirective;
    toolbarContent: ToolbarContentDirective;
    readonly toolbarItems: any;
    readonly dropdownItems: any;
    onMenuClicked(item: any, $event: any): void;
}
