import { Component, Input, EventEmitter, Output, forwardRef, HostBinding, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
var CHKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CheckboxComponent; }),
    multi: true
};
var nextId = 0;
var CheckboxComponent = /** @class */ (function () {
    function CheckboxComponent() {
    }
    Object.defineProperty(CheckboxComponent.prototype, "value", {
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
    CheckboxComponent.prototype.onBlur = function (event) {
        this.onTouchedCallback();
    };
    CheckboxComponent.prototype.onChange = function (event) {
        this.toggle();
    };
    CheckboxComponent.prototype.toggle = function () {
        this.value = !this.value;
    };
    CheckboxComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    CheckboxComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    CheckboxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return CheckboxComponent;
}());
export { CheckboxComponent };
//# sourceMappingURL=checkbox.component.js.map