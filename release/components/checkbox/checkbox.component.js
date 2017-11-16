var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter, Output, forwardRef, HostBinding, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var CHKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CheckboxComponent; }),
    multi: true
};
var nextId = 0;
var CheckboxComponent = /** @class */ (function () {
    function CheckboxComponent() {
        this.id = "checkbox-" + ++nextId;
        this.name = null;
        this.tabindex = 0;
        this.disabled = false;
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._value = false;
        this.onTouchedCallback = function () {
            // placeholder
        };
        this.onChangeCallback = function (_) {
            // placeholder
        };
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CheckboxComponent.prototype, "tabindex", void 0);
    __decorate([
        HostBinding('class.disabled'),
        Input(),
        __metadata("design:type", Boolean)
    ], CheckboxComponent.prototype, "disabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CheckboxComponent.prototype, "change", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CheckboxComponent.prototype, "blur", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CheckboxComponent.prototype, "focus", void 0);
    CheckboxComponent = __decorate([
        Component({
            selector: 'ngx-checkbox',
            providers: [CHKBOX_VALUE_ACCESSOR],
            template: "\n    <label class=\"checkbox-label\">\n      <input\n        type=\"checkbox\"\n        class=\"checkbox-input\"\n        [id]=\"id + '-chk'\"\n        [(ngModel)]=\"value\"\n        [disabled]=\"disabled\"\n        [name]=\"name + '-chk'\"\n        [tabIndex]=\"tabindex\"\n        (focus)=\"focus.emit($event)\"\n        (blur)=\"blur.emit($event)\"\n        (change)=\"change.emit($event)\"\n      />\n      <ng-content></ng-content>\n    </label>\n  ",
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./checkbox.component.css'],
            host: {
                class: 'ngx-checkbox'
            }
        })
    ], CheckboxComponent);
    return CheckboxComponent;
}());
export { CheckboxComponent };
//# sourceMappingURL=checkbox.component.js.map