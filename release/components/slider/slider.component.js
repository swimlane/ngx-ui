var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, HostListener, HostBinding, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var nextId = 0;
var SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SliderComponent; }),
    multi: true
};
var edge = window.navigator.userAgent.indexOf("Edge") > -1;
var SliderComponent = /** @class */ (function () {
    function SliderComponent() {
        this.id = "range-" + ++nextId;
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.orientation = 'horizontal';
        this.filled = false;
        this.multiple = false;
        this.disabled = false;
        this.showTicks = false;
        this._values = [0];
        this._percents = [0];
        this._thumbs = [];
        this._ticks = [];
        this._active = [];
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
            if (!this._values)
                return 0;
            if (this.multiple)
                return this._values.slice().sort((function (a, b) { return a - b; })).join(',');
            return this._values[0];
        },
        set: function (val) {
            val = ('' + val).split(',');
            if (String(val) !== String(this._values)) {
                this.setValues(val);
                this.onChangeCallback(this._values);
                this.change.emit({
                    value: this._values,
                    percent: this.percent
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "percent", {
        get: function () {
            var pct = this._percents;
            if (this.multiple)
                return pct.join(',');
            return '' + pct[0];
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
    SliderComponent.prototype.setValues = function (values) {
        var _this = this;
        this._values = values;
        this._percents = values
            .map(function (v) { return Math.max(_this.min, Math.min(_this.max, v)); })
            .map(function (v) { return Math.round(100 * (v - _this.min) / (_this.max - _this.min)); });
        this._thumbs = this._percents
            .map(function (p) {
            return {
                left: "calc(" + p + "% - " + p / 100 + "em)"
            };
        });
        if (this.filled) {
            this._fill = this.getFill();
        }
        if (this.showTicks) {
            this._ticks = this.getTicks();
        }
    };
    SliderComponent.prototype.setActive = function (index, active) {
        this._active[index] = active;
    };
    SliderComponent.prototype.ngOnInit = function () {
        if (this.showTicks) {
            this._ticks = this.getTicks();
        }
    };
    SliderComponent.prototype.setValue = function (val, index) {
        if (this._values[index] !== val) {
            this._values[index] = val;
            this.setValues(this._values);
            this.onChangeCallback(this.value);
            this.change.emit({
                value: this.value,
                percent: this.percent
            });
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
    SliderComponent.prototype.getTicks = function () {
        return this.getCount().map(function (p) {
            return {
                left: "calc(" + p + "% - " + (p / 100 - 0.5) + "em)"
            };
        });
    };
    SliderComponent.prototype.getFill = function () {
        if (this.filled) {
            var percentMin = this.multiple ? Math.min.apply(Math, this._percents) : 0;
            var percentMax = this.multiple ? Math.max.apply(Math, this._percents) : this._percents[0];
            var width = percentMax - percentMin;
            if (edge && this.multiple) {
                return {
                    left: "calc(" + percentMin + "% - " + (percentMin / 100 - 0.5) + "em)",
                    'background-size': "calc(" + width + "% - " + width / 100 + "em) 100%"
                };
            }
            return {
                left: percentMin + "%",
                'background-size': width + "% 100%"
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
        val = String(val).split(',');
        if (String(val) !== String(this._values)) {
            this.setValues(val);
        }
    };
    SliderComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    SliderComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    SliderComponent.prototype.trackIndex = function (index) {
        return index;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SliderComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SliderComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SliderComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SliderComponent.prototype, "step", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SliderComponent.prototype, "orientation", void 0);
    __decorate([
        HostBinding('class.filled'),
        Input(),
        __metadata("design:type", Boolean)
    ], SliderComponent.prototype, "filled", void 0);
    __decorate([
        HostBinding('class.multiple'),
        Input(),
        __metadata("design:type", Boolean)
    ], SliderComponent.prototype, "multiple", void 0);
    __decorate([
        HostBinding('class.disabled'),
        Input(),
        __metadata("design:type", Boolean)
    ], SliderComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SliderComponent.prototype, "showTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SliderComponent.prototype, "tickStep", void 0);
    __decorate([
        HostBinding('class.active'),
        __metadata("design:type", Boolean)
    ], SliderComponent.prototype, "active", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SliderComponent.prototype, "change", void 0);
    __decorate([
        HostBinding('class.horizontal'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], SliderComponent.prototype, "isHorizontal", null);
    __decorate([
        HostBinding('class.vertical'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], SliderComponent.prototype, "isVertical", null);
    __decorate([
        HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SliderComponent.prototype, "onMouseDown", null);
    __decorate([
        HostListener('mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SliderComponent.prototype, "onMouseUp", null);
    SliderComponent = __decorate([
        Component({
            selector: 'ngx-slider',
            template: "\n    <div class=\"slider-inner\">\n      <div class=\"ticks-container\" *ngIf=\"showTicks\">\n        <div class=\"tick\" *ngFor=\"let s of _ticks\" [ngStyle]=\"s\">\n        </div>\n      </div>\n      <div class=\"inputs\">\n        <div class=\"slider-track\">\n        </div>\n        <span\n          *ngIf=\"filled\"\n          [ngStyle]=\"_fill\"\n          class=\"fill-bar\">\n        </span>\n        <ng-container *ngFor=\"let value of _values; let i = index; let odd = odd; trackBy: trackIndex\">\n          <input\n            type=\"range\"\n            [id]=\"id + '-' + i\"\n            [attr.list]=\"id + '-list'\"\n            [attr.orientation]=\"orientation\"\n            [class.odd]=\"odd\"\n            [class.active]=\"_active[i]\"\n            [ngModel]=\"value\"\n            (ngModelChange)=\"setValue($event, i)\"\n            [min]=\"min\"\n            [max]=\"max\"\n            [step]=\"step\"\n            [disabled]=\"disabled\"\n            (input)=\"onChange($event)\"\n            (change)=\"onChange($event)\"\n            (mouseenter)=\"setActive(i, true)\"\n            (mouseleave)=\"setActive(i, false)\"\n          />\n          <div class=\"slider-thumb\" [class.active]=\"_active[i]\" [ngStyle]=\"_thumbs[i]\" >\n          </div>\n        </ng-container>\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./slider.component.css'],
            providers: [SLIDER_VALUE_ACCESSOR],
            host: {
                class: 'ngx-slider'
            }
        })
    ], SliderComponent);
    return SliderComponent;
}());
export { SliderComponent };
//# sourceMappingURL=slider.component.js.map