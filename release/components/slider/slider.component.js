import { Component, Input, Output, EventEmitter, HostListener, HostBinding, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var nextId = 0;
var SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SliderComponent; }),
    multi: true
};
var SliderComponent = (function () {
    function SliderComponent() {
        this.id = "range-" + ++nextId;
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.orientation = 'horizontal';
        this.filled = false;
        // Not supported in all
        // browers see polyfill
        // http://leaverou.github.io/multirange/
        this.multiple = false;
        this.showTicks = false;
        this.count = [];
        this.change = new EventEmitter();
        this.onTouchedCallback = function () {
            // placeholder
        };
        this.onChangeCallback = function () {
            // placeholder
        };
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
SliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-slider',
                template: "\n    <div class=\"slider-inner\">\n      <input\n        type=\"range\"\n        [id]=\"id\"\n        [attr.list]=\"id + '-list'\"\n        [attr.orientation]=\"orientation\"\n        [(ngModel)]=\"value\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [multiple]=\"multiple\"\n        [step]=\"step\"\n        (input)=\"onChange($event)\"\n        (change)=\"onChange($event)\"\n      />\n      <span\n        *ngIf=\"filled\"\n        [ngStyle]=\"getFill()\"\n        class=\"fill-bar\">\n      </span>\n      <datalist\n        *ngIf=\"showTicks\"\n        [id]=\"id + '-list'\">\n        <option *ngFor=\"let i of count\">\n          {{i}}\n        </option>\n      </datalist>\n    </div>\n  ",
                encapsulation: ViewEncapsulation.None,
                styleUrls: ['./slider.component.scss'],
                providers: [SLIDER_VALUE_ACCESSOR],
                host: {
                    class: 'ngx-slider'
                }
            },] },
];
/** @nocollapse */
SliderComponent.ctorParameters = function () { return []; };
SliderComponent.propDecorators = {
    'id': [{ type: Input },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'step': [{ type: Input },],
    'orientation': [{ type: Input },],
    'filled': [{ type: Input },],
    'multiple': [{ type: Input },],
    'showTicks': [{ type: Input },],
    'tickStep': [{ type: Input },],
    'change': [{ type: Output },],
    'isFilled': [{ type: HostBinding, args: ['class.filled',] },],
    'isHorizontal': [{ type: HostBinding, args: ['class.horizontal',] },],
    'isVertical': [{ type: HostBinding, args: ['class.vertical',] },],
    'isActive': [{ type: HostBinding, args: ['class.active',] },],
    'onMouseDown': [{ type: HostListener, args: ['mousedown', ['$event'],] },],
    'onMouseUp': [{ type: HostListener, args: ['mouseup', ['$event'],] },],
};
//# sourceMappingURL=slider.component.js.map