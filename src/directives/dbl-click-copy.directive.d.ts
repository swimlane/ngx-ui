import { EventEmitter, ElementRef } from '@angular/core';
export declare class DblClickCopy {
    private element;
    onCopy: EventEmitter<{}>;
    readonly title: string;
    constructor(element: ElementRef);
    onDblClick(event: any): void;
}
