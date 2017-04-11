import { EventEmitter, Renderer, ElementRef, OnInit } from '@angular/core';
export declare class DialogComponent implements OnInit {
    private element;
    private renderer;
    id: string;
    visible: boolean;
    zIndex: number;
    title: string;
    content: string;
    template: any;
    cssClass: string;
    context: any;
    closeOnBlur: boolean;
    closeOnEscape: boolean;
    closeButton: boolean;
    open: EventEmitter<{}>;
    close: EventEmitter<{}>;
    readonly contentzIndex: number;
    readonly visibleState: string;
    constructor(element: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    show(): void;
    onKeyDown(): void;
    hide(): void;
    onDocumentClick(target: any): void;
    containsTarget(target: any): boolean;
}
