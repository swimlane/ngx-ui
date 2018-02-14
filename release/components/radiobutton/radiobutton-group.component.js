var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter, Output, forwardRef, HostBinding, ViewEncapsulation, ContentChildren, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonComponent } from './radiobutton.component';
var RADIOGROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RadioButtonGroupComponent; }),
    multi: true
};
var nextId = 0;
var RadioButtonGroupComponent = /** @class */ (function () {
    function RadioButtonGroupComponent() {
        this._uniqueId = "ngx-radio-group-" + ++nextId;
        this.id = this._uniqueId;
        this.tabindex = 0;
        this.disabled = false;
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._name = this._uniqueId;
        this._value = false;
        this.onChangeCallback = function (_) {
            // placeholder
        };
        this.onTouchedCallback = function () {
            // placeholder
        };
    }
    Object.defineProperty(RadioButtonGroupComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value !== value) {
                this._value = value;
                this._updateSelectedRadioFromValue();
                this.onChangeCallback(this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButtonGroupComponent.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            if (this._name !== value) {
                this._updateRadioButtonNames();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButtonGroupComponent.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    RadioButtonGroupComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    RadioButtonGroupComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    RadioButtonGroupComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    RadioButtonGroupComponent.prototype._updateRadioButtonNames = function () {
        var _this = this;
        if (this._radios) {
            this._radios.forEach(function (radio) {
                radio.name = _this.name;
            });
        }
    };
    RadioButtonGroupComponent.prototype._updateSelectedRadioFromValue = function () {
        var _this = this;
        if (this._radios) {
            this._radios.forEach(function (radio) {
                radio.checked = _this.value === radio.value;
                if (radio.checked) {
                    _this._selected = radio;
                }
            });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], RadioButtonGroupComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], RadioButtonGroupComponent.prototype, "tabindex", void 0);
    __decorate([
        HostBinding('class.disabled'),
        Input(),
        __metadata("design:type", Boolean)
    ], RadioButtonGroupComponent.prototype, "disabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], RadioButtonGroupComponent.prototype, "change", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], RadioButtonGroupComponent.prototype, "blur", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], RadioButtonGroupComponent.prototype, "focus", void 0);
    __decorate([
        ContentChildren(forwardRef(function () { return RadioButtonComponent; }), { descendants: true }),
        __metadata("design:type", QueryList)
    ], RadioButtonGroupComponent.prototype, "_radios", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], RadioButtonGroupComponent.prototype, "value", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], RadioButtonGroupComponent.prototype, "name", null);
    RadioButtonGroupComponent = __decorate([
        Component({
            selector: 'ngx-radiobutton-group',
            providers: [RADIOGROUP_VALUE_ACCESSOR],
            template: "\n    <ng-content></ng-content>\n  ",
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./radiobutton.component.css'],
            host: {
                class: 'ngx-radiobutton-group'
            }
        })
    ], RadioButtonGroupComponent);
    return RadioButtonGroupComponent;
}());
export { RadioButtonGroupComponent };
//# sourceMappingURL=radiobutton-group.component.js.map