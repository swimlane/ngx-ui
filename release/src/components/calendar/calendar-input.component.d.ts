import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import './calendar.scss';
export declare class CalendarInputComponent implements ControlValueAccessor {
    onSelect: EventEmitter<{}>;
    value: any;
    private onTouchedCallback;
    private onChangeCallback;
    private _value;
    private viewModel;
    compareDates(newDate: any, oldDate: any): boolean;
    writeValue(val: any): void;
    open(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
