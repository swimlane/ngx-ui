import { ElementRef, AfterContentChecked } from '@angular/core';
export declare class AutosizeDirective implements AfterContentChecked {
    element: ElementRef;
    constructor(element: ElementRef);
    ngAfterContentChecked(): void;
    onInput(textArea: HTMLTextAreaElement): void;
    adjust(): void;
}
