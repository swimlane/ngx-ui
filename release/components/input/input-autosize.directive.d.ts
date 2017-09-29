import { ElementRef, AfterContentChecked, Renderer } from '@angular/core';
export declare class AutosizeDirective implements AfterContentChecked {
    element: ElementRef;
    private renderer;
    constructor(element: ElementRef, renderer: Renderer);
    ngAfterContentChecked(): void;
    onInput(textArea: HTMLTextAreaElement): void;
    adjust(): void;
}
