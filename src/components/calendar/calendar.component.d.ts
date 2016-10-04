/// <reference types="core-js" />
import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import './calendar.scss';
export declare class CalendarComponent implements OnInit, ControlValueAccessor {
    minDate: Date;
    maxDate: Date;
    daysOfWeek: string[];
    onSelect: EventEmitter<{}>;
    value: any;
    private onTouchedCallback;
    private onChangeCallback;
    private activeDate;
    private _value;
    private weeks;
    ngOnInit(): void;
    getDayClass(day: any): {
        'first-day-of-month': boolean;
        'last-day-of-week': boolean;
        'today': any;
        'active': any;
    };
    getDayDisabled(day: any): any;
    onDayClick(day: any): void;
    prevMonth(): void;
    nextMonth(): void;
    writeValue(val: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
