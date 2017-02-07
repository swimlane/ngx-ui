
import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class CalendarComponent implements OnInit, ControlValueAccessor {
    minDate: Date;
    disabled: boolean;
    maxDate: Date;
    daysOfWeek: string[];
    change: EventEmitter<any>;
    value: any;
    activeDate: any;
    _value: any;
    weeks: any[];
    ngOnInit(): void;
    getDayClass(day: any): any;
    getDayDisabled(date: any): boolean;
    onDayClick(day: any): void;
    prevMonth(): void;
    nextMonth(): void;
    writeValue(val: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onTouchedCallback;
    private onChangeCallback;
}
