var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { debounceable } from '../../utils';
import { DialogService } from '../dialog';
import { DateTimeType } from './date-time.type';
var nextId = 0;
var DATE_TIME_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DateTimeComponent; }),
    multi: true
};
var DateTimeComponent = (function () {
    function DateTimeComponent(dialogService) {
        this.dialogService = dialogService;
        this.id = "datetime-" + ++nextId;
        this.autofocus = false;
        this.placeholder = '';
        this.inputType = DateTimeType.date;
        this.change = new EventEmitter();
        this.onTouchedCallback = function () {
            // placeholder
        };
        this.onChangeCallback = function () {
            // placeholder
        };
    }
    Object.defineProperty(DateTimeComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (val) {
            var date = moment(val);
            var sameDiff = this.inputType === DateTimeType.date ? 'day' : undefined;
            var isSame = date.isSame(this._value, sameDiff);
            // if we have a val and had no val before, ensure
            // we set the property correctly even if its same
            if (!isSame || !this._value) {
                this._value = val;
                this.onChangeCallback(val);
                this.change.emit(val);
            }
        },
        enumerable: true,
        configurable: true
    });
    DateTimeComponent.prototype.ngOnInit = function () {
        if (!this.format) {
            if (this.inputType === DateTimeType.date) {
                this.format = 'MM/DD/Y';
            }
            else if (this.inputType === DateTimeType.datetime) {
                this.format = 'MM/DD/Y  hh:mm a';
            }
            else if (this.inputType === DateTimeType.time) {
                this.format = 'hh:mm a';
            }
        }
    };
    DateTimeComponent.prototype.ngOnDestroy = function () {
        this.close();
    };
    DateTimeComponent.prototype.writeValue = function (val) {
        var date = moment(val);
        var sameDiff = this.inputType === DateTimeType.date ? 'day' : undefined;
        var isSame = date.isSame(this._value, sameDiff);
        if (!isSame) {
            this._value = val;
        }
    };
    DateTimeComponent.prototype.open = function () {
        this.dateSelected(this._value || new Date());
        this.dialog = this.dialogService.create({
            cssClass: 'ngx-date-time-dialog',
            template: this.calendarTpl,
            closeButton: false
        });
    };
    DateTimeComponent.prototype.apply = function () {
        this.value = this.dialogModel.clone();
        this.close();
    };
    DateTimeComponent.prototype.dateSelected = function (date) {
        this.dialogModel = moment(date).clone();
        this.hour = this.dialogModel.format('hh');
        this.minute = this.dialogModel.format('mm');
        this.amPmVal = this.dialogModel.format('A');
    };
    DateTimeComponent.prototype.minuteChanged = function (newVal) {
        var diff = newVal - this.minute;
        var clone = this.dialogModel.clone();
        this.dialogModel = clone.add(diff, 'm');
    };
    DateTimeComponent.prototype.hourChanged = function (newVal) {
        var diff = newVal - this.hour;
        var clone = this.dialogModel.clone();
        this.dialogModel = clone.add(diff, 'h');
    };
    DateTimeComponent.prototype.selectCurrent = function () {
        this.dateSelected(new Date());
    };
    DateTimeComponent.prototype.clear = function () {
        this.dialogModel = undefined;
    };
    DateTimeComponent.prototype.onAmPmChange = function (newVal) {
        var clone = this.dialogModel.clone();
        if (newVal === 'AM') {
            clone.add(12, 'h');
        }
        else {
            clone.subtract(12, 'h');
        }
        this.dialogModel = clone;
    };
    DateTimeComponent.prototype.getDayDisabled = function (date) {
        if (!date)
            return false;
        var isBeforeMin = this.minDate && date.isSameOrBefore(this.minDate);
        var isAfterMax = this.maxDate && date.isSameOrAfter(this.maxDate);
        return isBeforeMin || isAfterMax;
    };
    DateTimeComponent.prototype.inputChanged = function (val) {
        var date = moment(val);
        var isValid = date.isValid();
        var outOfRange = this.getDayDisabled(date);
        if (isValid && !outOfRange) {
            this.value = date.toDate();
        }
        var errorMsg = '';
        if (!isValid)
            errorMsg = 'Invalid Date';
        if (outOfRange)
            errorMsg = 'Date out of range';
        this.errorMsg = errorMsg;
    };
    DateTimeComponent.prototype.close = function () {
        if (!this.dialog)
            return;
        // tear down the dialog instance
        this.dialogService.destroy(this.dialog);
    };
    DateTimeComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DateTimeComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DateTimeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-date-time',
                    providers: [DATE_TIME_VALUE_ACCESSOR],
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./date-time.component.css'],
                    templateUrl: './date-time.component.html'
                },] },
    ];
    /** @nocollapse */
    DateTimeComponent.ctorParameters = function () { return [
        { type: DialogService, },
    ]; };
    DateTimeComponent.propDecorators = {
        'id': [{ type: Input },],
        'name': [{ type: Input },],
        'disabled': [{ type: Input },],
        'tabindex': [{ type: Input },],
        'autofocus': [{ type: Input },],
        'label': [{ type: Input },],
        'hint': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'minDate': [{ type: Input },],
        'maxDate': [{ type: Input },],
        'format': [{ type: Input },],
        'inputType': [{ type: Input },],
        'change': [{ type: Output },],
        'calendarTpl': [{ type: ViewChild, args: ['dialogTpl',] },],
    };
    __decorate([
        debounceable(500),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DateTimeComponent.prototype, "inputChanged", null);
    return DateTimeComponent;
}());
export { DateTimeComponent };
//# sourceMappingURL=date-time.component.js.map