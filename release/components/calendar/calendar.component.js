import { Component, Input, Output, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { getMonth } from './calendar-utils';
var CALENDAR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CalendarComponent; }),
    multi: true
};
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent() {
        this.daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.change = new EventEmitter();
        this.onTouchedCallback = function () {
            // placeholder
        };
        this.onChangeCallback = function () {
            // placeholder
        };
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
        this.activeDate = moment(val);
        this.weeks = getMonth(this.activeDate);
        var isSame = this.activeDate.isSame(this.value, 'day');
        if (!isSame) {
            this._value = val;
        }
    };
    CalendarComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    CalendarComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    CalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-calendar',
                    providers: [CALENDAR_VALUE_ACCESSOR],
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./calendar.component.css'],
                    template: "\n    <div class=\"ngx-calendar-wrap\">\n      <div \n        class=\"title-row\" \n        fxLayout=\"row\" \n        fxLayoutWrap=\"nowrap\" \n        fxLayoutAlign=\"center center\">\n        <div fxFlex=\"100%\" class=\"text-center\">\n          <button\n            type=\"button\"\n            class=\"prev-month\"\n            [disabled]=\"disabled\"\n            title=\"Previous Month\"\n            (click)=\"prevMonth()\">\n            <span class=\"icon-arrow-left\"></span>\n          </button>\n          <span class=\"current-month\">\n            {{ activeDate | amDateFormat: 'MMMM YYYY' }}\n          </span>\n          <button\n            type=\"button\"\n            class=\"next-month\"\n            title=\"Next Month\"\n            [disabled]=\"disabled\"\n            (click)=\"nextMonth()\">\n            <span class=\"icon-arrow-right\"></span>\n          </button>\n        </div>\n      </div>\n      <div class=\"day-name-row\">\n        <div \n          fxLayout=\"row\" \n          fxLayoutWrap=\"nowrap\" \n          fxFill>\n          <div\n            class=\"day-name text-center\"\n            fxFlex=\"30px\"\n            *ngFor=\"let d of daysOfWeek\">\n            {{d}}\n          </div>\n        </div>\n      </div>\n      <div class=\"day-container\">\n        <div\n          *ngFor=\"let week of weeks\"\n          class=\"day-row\"\n          fxLayout=\"row\" \n          fxLayoutWrap=\"nowrap\" \n          fxFill>\n          <div\n            *ngFor=\"let day of week\"\n            class=\"day-cell text-center\"\n            fxFlex=\"30px\">\n            <button\n              *ngIf=\"day.num\"\n              class=\"day\"\n              type=\"button\"\n              [title]=\"day.date | amDateFormat: 'LL'\"\n              [class.active]=\"getDayActive(day.date)\"\n              [ngClass]=\"day.classes\"\n              [disabled]=\"getDayDisabled(day.date)\"\n              (click)=\"onDayClick(day)\">\n              {{day.num}}\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                    host: {
                        class: 'ngx-calendar',
                        tabindex: '1',
                        '(blur)': 'onTouchedCallback()'
                    }
                },] },
    ];
    /** @nocollapse */
    CalendarComponent.ctorParameters = function () { return []; };
    CalendarComponent.propDecorators = {
        'minDate': [{ type: Input },],
        'disabled': [{ type: Input },],
        'maxDate': [{ type: Input },],
        'daysOfWeek': [{ type: Input },],
        'change': [{ type: Output },],
    };
    return CalendarComponent;
}());
export { CalendarComponent };
//# sourceMappingURL=calendar.component.js.map