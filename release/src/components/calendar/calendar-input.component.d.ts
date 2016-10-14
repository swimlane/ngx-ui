/// <reference types="core-js" />
import { EventEmitter, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DialogService } from '../dialog';
import './calendar-input.scss';
export declare class CalendarInputComponent implements ControlValueAccessor {
    private dialogService;
    label: string;
    disabled: boolean;
    minDate: Date;
    maxDate: Date;
    hint: string;
    format: string;
    placeholder: string;
    tabindex: number;
    autofocus: boolean;
    onSelect: EventEmitter<{}>;
    calendarTpl: TemplateRef<any>;
    value: any;
    private _value;
    private dialogModel;
    private dialog;
    private error;
    private onTouchedCallback;
    private onChangeCallback;
    constructor(dialogService: DialogService);
    writeValue(val: any): void;
    open(): void;
    apply(): void;
    dateSelected(date: any): void;
    getDayDisabled(date: any): any;
    inputChanged(val: any): void;
    close(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
