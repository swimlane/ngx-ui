import { EventEmitter, AfterViewInit } from '@angular/core';
export declare class SelectInputComponent implements AfterViewInit {
    placeholder: string;
    autofocus: boolean;
    allowClear: boolean;
    multiple: boolean;
    tagging: boolean;
    identifier: string;
    options: any[];
    label: string;
    hint: string;
    allowAdditions: boolean;
    disableDropdown: boolean;
    selected: any[];
    toggle: EventEmitter<any>;
    selection: EventEmitter<any>;
    activate: EventEmitter<any>;
    keyup: EventEmitter<any>;
    inputElement: any;
    readonly caretVisible: boolean;
    selectedOptions: any[];
    _selected: any[];
    ngAfterViewInit(): void;
    onKeyUp(event: any): void;
    onKeyDown(event: any): void;
    onClick(event: any): void;
    onOptionRemove(event: any, option: any): void;
    calcSelectedOptions(selected: any[]): any[];
}
