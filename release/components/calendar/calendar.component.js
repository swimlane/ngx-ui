import { Component, Input, Output, EventEmitter, forwardRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { getMonth, CalenderDay, Month } from './calendar-utils';
var CALENDAR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CalendarComponent; }),
    multi: true
};
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent() {
    }
    Object.defineProperty(CalendarComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            var isSame = moment(val).isSame(this._value, 'day');
            if (!isSame) {
                this._value = val;
                this.onChangeCallback(this._value);
                this.change.emit(this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    CalendarComponent.prototype.ngOnInit = function () {
        this.activeDate = moment(this.value);
        this.weeks = getMonth(this.activeDate);
    };
    CalendarComponent.prototype.getDayActive = function (date) {
        return date.isSame(this.value, 'day');
    };
    CalendarComponent.prototype.getDayDisabled = function (date) {
        if (this.disabled)
            return true;
        if (!date)
            return false;
        var isBeforeMin = this.minDate && date.isSameOrBefore(this.minDate);
        var isAfterMax = this.maxDate && date.isSameOrAfter(this.maxDate);
        return isBeforeMin || isAfterMax;
    };
    CalendarComponent.prototype.onDayClick = function (day) {
        this.value = day.date.clone().toDate();
        if (day.prevMonth) {
            this.prevMonth();
        }
        else if (day.nextMonth) {
            this.nextMonth();
        }
    };
    CalendarComponent.prototype.prevMonth = function () {
        var date = this.activeDate.clone();
        this.activeDate = date.subtract(1, 'month');
        this.weeks = getMonth(this.activeDate);
    };
    CalendarComponent.prototype.nextMonth = function () {
        var date = this.activeDate.clone();
        this.activeDate = date.add(1, 'month');
        this.weeks = getMonth(this.activeDate);
    };
    CalendarComponent.prototype.writeValue = function (val) {
        var isSame = moment(val).isSame(this.value, 'day');
        if (!isSame) {
            this._value = val;
            this.activeDate = moment(val);
            this.weeks = getMonth(this.activeDate);
        }
    };
    CalendarComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    CalendarComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return CalendarComponent;
}());
export { CalendarComponent };
//# sourceMappingURL=calendar.component.js.map