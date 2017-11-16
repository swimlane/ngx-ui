var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, HostBinding, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var TOGGLE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ToggleComponent; }),
    multi: true
};
var nextId = 0;
var ToggleComponent = /** @class */ (function () {
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ToggleComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ToggleComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ToggleComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ToggleComponent.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ToggleComponent.prototype, "tabIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ToggleComponent.prototype, "label", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ToggleComponent.prototype, "change", void 0);
    __decorate([
        HostBinding('class'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], ToggleComponent.prototype, "getHostCssClasses", null);
    __decorate([
        HostBinding('class.disabled'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], ToggleComponent.prototype, "getDisabled", null);
    ToggleComponent = __decorate([
        Component({
            selector: 'ngx-toggle',
            template: "\n    <div>\n      <input\n        #input\n        class=\"ngx-toggle-input\"\n        type=\"checkbox\"\n        [id]=\"id\"\n        [(ngModel)]=\"value\"\n        [required]=\"required\"\n        [tabIndex]=\"tabIndex\"\n        [disabled]=\"disabled\"\n        [name]=\"name\"\n        (blur)=\"onBlur()\"\n        (change)=\"onChange()\"\n      />\n      <label [attr.for]=\"id\" class=\"ngx-toggle-label\">\n      </label>\n      <label [attr.for]=\"id\" class=\"ngx-toggle-text\">\n        <span *ngIf=\"label\" [innerHTML]=\"label\"></span>\n        <ng-content></ng-content>\n      </label>\n    </div>\n  ",
            styleUrls: ['./toggle.component.css'],
            encapsulation: ViewEncapsulation.None,
            providers: [TOGGLE_VALUE_ACCESSOR]
        })
    ], ToggleComponent);
    return ToggleComponent;
}());
export { ToggleComponent };
//# sourceMappingURL=toggle.component.js.map