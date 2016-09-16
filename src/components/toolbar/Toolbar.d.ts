import { EventEmitter } from '@angular/core';
import './toolbar.scss';
export declare class Toolbar {
    title: string;
    subtitle: string;
    menu: any;
    onMenuClick: EventEmitter<{}>;
    toolbarTitle: any;
    toolbarContent: any;
    readonly toolbarItems: any;
    readonly dropdownItems: any;
    menuClicked(item: any, $event: any): void;
}
