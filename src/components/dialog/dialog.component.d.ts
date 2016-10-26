import { EventEmitter, ElementRef, OnInit } from '@angular/core';
import './dialog.scss';
export declare class DialogComponent implements OnInit {
    private element;
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
    constructor(element: ElementRef);
    ngOnInit(): void;
    show(): void;
    hide(): void;
    onDocumentClick(target: any): void;
}
