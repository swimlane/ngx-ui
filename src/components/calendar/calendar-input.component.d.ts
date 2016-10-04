import { EventEmitter, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DialogService } from '../dialog';
import './calendar-input.scss';
export declare class CalendarInputComponent implements ControlValueAccessor {
    private dialogService;
    onSelect: EventEmitter<{}>;
    calendarTpl: TemplateRef<any>;
    value: any;
    private onTouchedCallback;
    private onChangeCallback;
    private _value;
    private viewModel;
    constructor(dialogService: DialogService);
    compareDates(newDate: any, oldDate: any): boolean;
    writeValue(val: any): void;
    open(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
