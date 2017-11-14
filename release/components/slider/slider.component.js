import { Component, Input, Output, EventEmitter, OnInit, HostListener, HostBinding, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
var nextId = 0;
var SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SliderComponent; }),
    multi: true
};
var SliderComponent = /** @class */ (function () {
    function SliderComponent() {
    }
    Object.defineProperty(SliderComponent.prototype, "value", {
        get: function () {
            if (!this._value)
                return 0;
            if (!this._value.join)
                return this._value;
            return this._value.join(',');
        },
        set: function (val) {
            if (val !== this._value) {
                this._value = val;
                this.onChangeCallback(this._value);
                this.change.emit({
                    value: this.value,
                    percent: this.percent
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "isFilled", {
        get: function () {
            return this.filled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "isHorizontal", {
        get: function () {
            return this.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "isVertical", {
        get: function () {
            return this.orientation === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "isActive", {
        get: function () {
            return this.active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "percent", {
        get: function () {
            return Math.round(100 * (this.value - this.min) / (this.max - this.min));
        },
        enumerable: true,
        configurable: true
    });
    SliderComponent.prototype.ngOnInit = function () {
        if (this.showTicks) {
            this.count = this.getCount();
        }
    };
    SliderComponent.prototype.getCount = function () {
        var idxs = [];
        var step = this.tickStep || this.step;
        var i = this.min;
        while (i <= this.max) {
            idxs.push(i);
            i += step;
        }
        return idxs;
    };
    SliderComponent.prototype.getFill = function () {
        if (this.filled) {
            var size = this.isHorizontal ?
                this.percent + "% 100%" :
                "100% " + this.percent + "%";
            return {
                'background-size': size
            };
        }
    };
    SliderComponent.prototype.onMouseDown = function () {
        event.stopPropagation();
        this.active = true;
    };
    SliderComponent.prototype.onMouseUp = function () {
        event.stopPropagation();
        this.active = false;
    };
    SliderComponent.prototype.onChange = function (event) {
        event.stopPropagation();
        this.change.emit({
            value: this.value,
            percent: this.percent
        });
    };
    SliderComponent.prototype.writeValue = function (val) {
        if (val !== this._value) {
            this._value = val;
        }
    };
    SliderComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    SliderComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return SliderComponent;
}());
export { SliderComponent };
//# sourceMappingURL=slider.component.js.map