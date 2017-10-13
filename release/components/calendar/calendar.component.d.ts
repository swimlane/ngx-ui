import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';
import { CalenderDay, Month } from './calendar-utils';
export declare class CalendarComponent implements OnInit, ControlValueAccessor {
    minDate: Date;
    disabled: boolean;
    maxDate: Date;
    daysOfWeek: string[];
    change: EventEmitter<any>;
    value: Date;
    activeDate: moment.Moment;
    _value: Date;
    weeks: Month;
    ngOnInit(): void;
    getDayActive(date: moment.Moment): boolean;
    getDayDisabled(date: moment.Moment): boolean;
    onDayClick(day: CalenderDay): void;
    prevMonth(): void;
    nextMonth(): void;
    writeValue(val: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onTouchedCallback;
    private onChangeCallback;
}
