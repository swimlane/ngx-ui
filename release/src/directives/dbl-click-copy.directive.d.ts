import { EventEmitter, ElementRef } from '@angular/core';
export declare class DblClickCopyDirective {
    private element;
    onCopy: EventEmitter<{}>;
    readonly title: string;
    constructor(element: ElementRef);
    onDblClick(event: any): void;
}
