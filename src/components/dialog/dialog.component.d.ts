import { EventEmitter, ElementRef, OnInit } from '@angular/core';
import { DialogOptions } from './dialog-options';
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
    onOpen: EventEmitter<{}>;
    onClose: EventEmitter<{}>;
    readonly contentzIndex: number;
    readonly visibleState: string;
    constructor(element: ElementRef, options: DialogOptions);
    ngOnInit(): void;
    show(): void;
    hide(): void;
    onDocumentClick(target: any): void;
}
