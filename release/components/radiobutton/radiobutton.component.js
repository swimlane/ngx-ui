var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Input, EventEmitter, Output, forwardRef, HostBinding, ViewEncapsulation, Optional } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonGroupComponent } from './radiobutton-group.component';
var CHKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RadioButtonComponent; }),
    multi: true
};
var nextId = 0;
var RadioButtonComponent = /** @class */ (function () {
    function RadioButtonComponent(radioGroup) {
        this.radioGroup = radioGroup;
        this._uniqueId = "ngx-radio-" + ++nextId;
        this.id = this._uniqueId;
        this.name = this._uniqueId;
        this.tabindex = 0;
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._checked = false;
        this._value = false;
        this._disabled = false;
        this.onChangeCallback = function (_) {
            // placeholder
        };
        this.onTouchedCallback = function () {
            // placeholder
        };
        this.radioGroup = radioGroup;
    }
    Object.defineProperty(RadioButtonComponent.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (value) {
            value = !!value;
            if (this._checked !== value) {
                this._checked = value;
                if (this._checked && this.radioGroup && this.radioGroup.value !== this.value) {
                    this.radioGroup.value = this.value;
                }
                this.onChangeCallback(this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButtonComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this.value !== value) {
                this._value = value;
                if (this.radioGroup) {
                    this._checked = this.radioGroup.value === this.value;
                }
                this.onChangeCallback(this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButtonComponent.prototype, "disabled", {
        get: function () {
            return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
        },
        set: function (value) {
            this._disabled = !!value;
        },
        enumerable: true,
        configurable: true
    });
    RadioButtonComponent.prototype.ngOnInit = function () {
        if (this.radioGroup) {
            this.checked = this.radioGroup.value === this._value;
            this.name = this.radioGroup.name;
        }
    };
    RadioButtonComponent.prototype._onInputChange = function (event) {
        event.stopPropagation();
        this.change.emit(event);
        this.checked = true;
        if (this.radioGroup) {
            this.radioGroup.value = this.value;
        }
    };
    RadioButtonComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    RadioButtonComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    RadioButtonComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], RadioButtonComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], RadioButtonComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], RadioButtonComponent.prototype, "tabindex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], RadioButtonComponent.prototype, "change", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], RadioButtonComponent.prototype, "blur", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], RadioButtonComponent.prototype, "focus", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], RadioButtonComponent.prototype, "checked", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Object])
    ], RadioButtonComponent.prototype, "value", null);
    __decorate([
        Input(),
        HostBinding('class.disabled'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], RadioButtonComponent.prototype, "disabled", null);
    RadioButtonComponent = __decorate([
        Component({
            selector: 'ngx-radiobutton',
            providers: [CHKBOX_VALUE_ACCESSOR],
            template: "\n    <label class=\"radio-label\">\n      <input\n        type=\"radio\"\n        class=\"radio-input\"\n        [id]=\"id\"\n        [checked]=\"checked\"\n        [disabled]=\"disabled\"\n        [name]=\"name\"\n        [tabIndex]=\"tabindex\"\n        (focus)=\"focus.emit($event)\"\n        (blur)=\"blur.emit($event)\"\n        (change)=\"_onInputChange($event)\"\n      />\n      <span class=\"checkmark\"></span>\n      <ng-content></ng-content>\n    </label>\n  ",
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./radiobutton.component.css'],
            host: {
                class: 'ngx-radiobutton'
            }
        }),
        __param(0, Optional()),
        __metadata("design:paramtypes", [RadioButtonGroupComponent])
    ], RadioButtonComponent);
    return RadioButtonComponent;
}());
export { RadioButtonComponent };
//# sourceMappingURL=radiobutton.component.js.map