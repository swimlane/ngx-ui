/// <reference types="core-js" />
import { EventEmitter, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DialogService } from '../dialog';
import './calendar-input.scss';
export declare class CalendarInputComponent implements ControlValueAccessor {
    private dialogService;
    disabled: boolean;
    calendarMinDate: Date;
    calendarMaxDate: Date;
    calendarFormat: string;
    inputPlaceholder: string;
    onSelect: EventEmitter<{}>;
    calendarTpl: TemplateRef<any>;
    value: any;
    private _value;
    private dialogModel;
    private dialog;
    private onTouchedCallback;
    private onChangeCallback;
    constructor(dialogService: DialogService);
    writeValue(val: any): void;
    open(): void;
    apply(): void;
    dateSelected(date: any): void;
    inputChanged(val: any): void;
    close(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
