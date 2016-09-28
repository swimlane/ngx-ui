import { ElementRef, EventEmitter } from '@angular/core';
export declare class DropdownToggleDirective {
    disabled: boolean;
    onToggle: EventEmitter<{}>;
    element: any;
    constructor(element: ElementRef);
    onClick(event: any): void;
}
