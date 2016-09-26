import { ElementRef, AfterViewInit, Renderer } from '@angular/core';
import { TooltipOptions } from './tooltip-options';
export declare class TooltipContentComponent implements AfterViewInit {
    element: ElementRef;
    private renderer;
    caretElm: any;
    readonly cssClasses: string;
    readonly visibilityChanged: string;
    private title;
    private template;
    private context;
    private host;
    private showCaret;
    private type;
    private placement;
    private alignment;
    private spacing;
    private cssClass;
    private id;
    constructor(element: ElementRef, renderer: Renderer, options: TooltipOptions);
    ngAfterViewInit(): void;
    position(): void;
    positionContent(nativeElm: any, hostDim: any, elmDim: any): void;
    positionCaret(hostDim: any, elmDim: any): void;
    checkFlip(hostDim: any, elmDim: any): void;
    onWindowResize(): void;
}
