import { EventEmitter, ElementRef } from '@angular/core';
import { DialogOptions } from './dialog-options';
import './dialog.scss';
export declare class DialogComponent {
    private element;
    id: string;
    zIndex: number;
    title: string;
    template: any;
    cssClass: string;
    context: any;
    closeOnBlur: boolean;
    closeOnEscape: boolean;
    closeButton: boolean;
    onClose: EventEmitter<{}>;
    readonly contentzIndex: number;
    constructor(element: ElementRef, options: DialogOptions);
    show(): void;
    hide(): void;
    onDocumentClick(target: any): void;
}
