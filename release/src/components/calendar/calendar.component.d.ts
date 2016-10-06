/// <reference types="core-js" />
import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import './calendar.scss';
export declare class CalendarComponent implements OnInit, ControlValueAccessor {
    minDate: Date;
    disabled: boolean;
    maxDate: Date;
    daysOfWeek: string[];
    onSelect: EventEmitter<any>;
    value: any;
    private activeDate;
    private _value;
    private weeks;
    private onTouchedCallback;
    private onChangeCallback;
    ngOnInit(): void;
    getDayClass(day: any): {
        'first-day-of-month': boolean;
        'last-day-of-week': boolean;
        today: any;
        active: any;
    };
    getDayDisabled(date: any): any;
    onDayClick(day: any): void;
    prevMonth(): void;
    nextMonth(): void;
    writeValue(val: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
