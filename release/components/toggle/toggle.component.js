import { Component, Input, Output, EventEmitter, HostBinding, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
var TOGGLE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ToggleComponent; }),
    multi: true
};
var nextId = 0;
var ToggleComponent = /** @class */ (function () {
    function ToggleComponent() {
    }
    Object.defineProperty(ToggleComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this.value !== value) {
                this._value = value;
                this.onChangeCallback(this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleComponent.prototype, "getHostCssClasses", {
        get: function () {
            return 'ngx-toggle';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleComponent.prototype, "getDisabled", {
        get: function () {
            return this.disabled ? 'disabled' : '';
        },
        enumerable: true,
        configurable: true
    });
    ToggleComponent.prototype.toggle = function () {
        this.value = !this.value;
    };
    ToggleComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    ToggleComponent.prototype.onChange = function () {
        var _this = this;
        setTimeout(function () {
            _this.onChangeCallback(_this._value);
        });
    };
    ToggleComponent.prototype.writeValue = function (val) {
        if (val !== this._value) {
            this._value = val;
        }
    };
    ToggleComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    ToggleComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return ToggleComponent;
}());
export { ToggleComponent };
//# sourceMappingURL=toggle.component.js.map