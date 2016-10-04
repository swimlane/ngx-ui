import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import './calendar.scss';
export declare class CalendarComponent implements OnInit, ControlValueAccessor {
    daysOfWeek: string[];
    onSelect: EventEmitter<{}>;
    value: any;
    private onTouchedCallback;
    private onChangeCallback;
    private weeks;
    private active;
    private _value;
    ngOnInit(): void;
    updateView(): void;
    compareDates(newDate: any, oldDate: any): boolean;
    getDayClass(dayNum: number, weekNum: number): {
        'prev-month': boolean;
        'next-month': boolean;
        'current-day': boolean;
    };
    onDayClick(event: any, dayNum: any, weekNum: any): void;
    prevMonth(): void;
    nextMonth(): void;
    writeValue(val: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
