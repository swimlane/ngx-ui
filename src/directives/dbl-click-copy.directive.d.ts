import { EventEmitter, ElementRef } from '@angular/core';
export declare class DblClickCopy {
    onCopy: EventEmitter<{}>;
    element: any;
    constructor(elm: ElementRef);
    onDblClick(event: any): void;
}
