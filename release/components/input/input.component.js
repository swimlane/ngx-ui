import { Component, Input, Output, EventEmitter, trigger, HostBinding, state, style, transition, animate, OnInit, OnChanges, ViewEncapsulation, forwardRef, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { InputTypes } from './input-types';
var nextId = 0;
var INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return InputComponent; }),
    multi: true
};
var InputComponent = /** @class */ (function () {
    function InputComponent(cd) {
        this.cd = cd;
    }
    Object.defineProperty(InputComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            if (val !== this._value) {
                this._value = val;
                this.onChangeCallback(this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "focusedOrDirty", {
        get: function () {
            if (this.focused) {
                return true;
            }
            if (typeof this.value === 'string') {
                return this.value && this.value.length;
            }
            return typeof this.value !== 'undefined' && this.value !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "getHostCssClasses", {
        get: function () {
            return 'ngx-input';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "isInvalid", {
        get: function () {
            return this.inputModel &&
                this.inputModel.invalid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "isValid", {
        get: function () {
            return this.inputModel &&
                this.inputModel.valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "isTouched", {
        get: function () {
            return this.inputModel &&
                this.inputModel.touched;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "getCssClasses", {
        get: function () {
            if (!this.inputModel)
                return {};
            return {
                'ng-invalid': this.isInvalid,
                'ng-touched': this.isTouched,
                'ng-valid': this.isValid
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "labelState", {
        get: function () {
            if (this.placeholder)
                return 'outside';
            if (this.focusedOrDirty)
                return 'outside';
            return 'inside';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "underlineState", {
        get: function () {
            if (this.focused)
                return 'expanded';
            return 'collapsed';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "requiredIndicatorView", {
        get: function () {
            if (!this.requiredIndicator || !this.required)
                return '';
            return this.requiredIndicator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "element", {
        get: function () {
            if (this.type === InputTypes.textarea)
                return this.textareaControl;
            return this.inputControl;
        },
        enumerable: true,
        configurable: true
    });
    InputComponent.prototype.ngOnInit = function () {
        if (!this.value)
            this.value = '';
    };
    InputComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.autofocus) {
            setTimeout(function () {
                _this.element.nativeElement.focus();
            });
        }
        // sometimes the label doesn't update on load
        setTimeout(function () { return _this.cd.markForCheck(); });
    };
    InputComponent.prototype.onChange = function (event) {
        event.stopPropagation();
        this.change.emit(this.value);
    };
    InputComponent.prototype.onKeyUp = function (event) {
        event.stopPropagation();
        this.keyup.emit(event);
    };
    InputComponent.prototype.onFocus = function (event) {
        var _this = this;
        event.stopPropagation();
        if (this.autoSelect) {
            setTimeout(function () {
                _this.element.nativeElement.select();
            });
        }
        this.focused = true;
        this.focus.emit(event);
        this.onTouchedCallback();
    };
    InputComponent.prototype.onBlur = function (event) {
        event.stopPropagation();
        this.focused = false;
        this.blur.emit(event);
    };
    InputComponent.prototype.writeValue = function (val) {
        if (val !== this._value) {
            this._value = val;
        }
    };
    InputComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    InputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    InputComponent.prototype.togglePassword = function () {
        var _this = this;
        this.passwordTextVisible = !this.passwordTextVisible;
        setTimeout(function () {
            if (_this.passwordTextVisible) {
                _this.passwordControl.nativeElement.focus();
            }
            else {
                _this.element.nativeElement.focus();
            }
        });
    };
    return InputComponent;
}());
export { InputComponent };
//# sourceMappingURL=input.component.js.map