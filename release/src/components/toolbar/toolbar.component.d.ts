import { EventEmitter } from '@angular/core';
import { ToolbarTitleDirective } from './toolbar-title.directive';
import { ToolbarContentDirective } from './toolbar-content.directive';
import './toolbar.scss';
export declare class ToolbarComponent {
    title: string;
    subtitle: string;
    menu: any;
    onMenuClick: EventEmitter<{}>;
    toolbarTitle: ToolbarTitleDirective;
    toolbarContent: ToolbarContentDirective;
    readonly toolbarItems: any;
    readonly dropdownItems: any;
    menuClicked(item: any, $event: any): void;
}
