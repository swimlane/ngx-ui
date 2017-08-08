import { Component, Input, Output, EventEmitter, HostBinding, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var TOGGLE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ToggleComponent; }),
    multi: true
};
var nextId = 0;
var ToggleComponent = (function () {
    function ToggleComponent() {
        this.id = "toggle-" + ++nextId;
        this.name = null;
        this.disabled = false;
        this.required = false;
        this.tabIndex = 0;
        this.change = new EventEmitter();
        this.onTouchedCallback = function () {
            // placeholder
        };
        this.onChangeCallback = function (_) {
            // placeholder
        };
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
    ToggleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-toggle',
                    template: "\n    <div>\n      <input\n        #input\n        class=\"ngx-toggle-input\"\n        type=\"checkbox\"\n        [id]=\"id\"\n        [(ngModel)]=\"value\"\n        [required]=\"required\"\n        [tabIndex]=\"tabIndex\"\n        [disabled]=\"disabled\"\n        [name]=\"name\"\n        (blur)=\"onBlur()\"\n        (change)=\"onChange()\"\n      />\n      <label [attr.for]=\"id\" class=\"ngx-toggle-label\">\n      </label>\n      <label [attr.for]=\"id\" class=\"ngx-toggle-text\">\n        <span *ngIf=\"label\" [innerHTML]=\"label\"></span>\n        <ng-content></ng-content>\n      </label>\n    </div>\n  ",
                    styleUrls: ['./toggle.component.css'],
                    encapsulation: ViewEncapsulation.None,
                    providers: [TOGGLE_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    ToggleComponent.ctorParameters = function () { return []; };
    ToggleComponent.propDecorators = {
        'id': [{ type: Input },],
        'name': [{ type: Input },],
        'disabled': [{ type: Input },],
        'required': [{ type: Input },],
        'tabIndex': [{ type: Input },],
        'label': [{ type: Input },],
        'change': [{ type: Output },],
        'getHostCssClasses': [{ type: HostBinding, args: ['class',] },],
        'getDisabled': [{ type: HostBinding, args: ['class.disabled',] },],
    };
    return ToggleComponent;
}());
export { ToggleComponent };
//# sourceMappingURL=toggle.component.js.map