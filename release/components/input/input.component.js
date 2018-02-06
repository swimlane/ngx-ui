var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, trigger, HostBinding, state, style, transition, animate, ViewEncapsulation, forwardRef, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
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
        this.id = "input-" + ++nextId;
        this.label = '';
        this.type = InputTypes.text;
        this.placeholder = '';
        this.disabled = false;
        this.required = false;
        this.requiredIndicator = '*';
        this.passwordToggleEnabled = false;
        this.passwordTextVisible = false;
        this.autoSelect = false;
        this.autofocus = false;
        this.autocomplete = false;
        this.autocorrect = false;
        this.spellcheck = false;
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this.keyup = new EventEmitter();
        this.click = new EventEmitter();
        this.focused = false;
        this.onTouchedCallback = function () {
            // placeholder
        };
        this.onChangeCallback = function () {
            // placeholder
        };
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputComponent.prototype, "hint", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], InputComponent.prototype, "tabindex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], InputComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], InputComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], InputComponent.prototype, "minlength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], InputComponent.prototype, "maxlength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], InputComponent.prototype, "requiredIndicator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "passwordToggleEnabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "passwordTextVisible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "autoSelect", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "autofocus", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "autocomplete", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "autocorrect", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputComponent.prototype, "spellcheck", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], InputComponent.prototype, "change", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], InputComponent.prototype, "blur", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], InputComponent.prototype, "focus", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], InputComponent.prototype, "keyup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], InputComponent.prototype, "click", void 0);
    __decorate([
        HostBinding('class'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], InputComponent.prototype, "getHostCssClasses", null);
    __decorate([
        ViewChild('inputModel'),
        __metadata("design:type", NgModel)
    ], InputComponent.prototype, "inputModel", void 0);
    __decorate([
        ViewChild('inputControl'),
        __metadata("design:type", ElementRef)
    ], InputComponent.prototype, "inputControl", void 0);
    __decorate([
        ViewChild('textareaControl'),
        __metadata("design:type", ElementRef)
    ], InputComponent.prototype, "textareaControl", void 0);
    __decorate([
        ViewChild('passwordControl'),
        __metadata("design:type", ElementRef)
    ], InputComponent.prototype, "passwordControl", void 0);
    InputComponent = __decorate([
        Component({
            selector: 'ngx-input',
            providers: [INPUT_VALUE_ACCESSOR],
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./input.component.css'],
            template: "\n    <div\n      class=\"ngx-input-wrap\"\n      [ngClass]=\"getCssClasses\">\n      <div class=\"ngx-input-flex-wrap\">\n        <ng-content select=\"ngx-input-prefix\"></ng-content>\n        <div class=\"ngx-input-flex-wrap-inner\">\n          <div class=\"ngx-input-box-wrap\">\n            <textarea\n              *ngIf=\"type === 'textarea'\"\n              class=\"ngx-input-textarea\"\n              rows=\"1\"\n              autosize\n              [(ngModel)]=\"value\"\n              [id]=\"id\"\n              [name]=\"name\"\n              [placeholder]=\"placeholder\"\n              [disabled]=\"disabled\"\n              [attr.tabindex]=\"tabindex\"\n              [attr.autocomplete]=\"autocomplete\"\n              [attr.autocorrect]=\"autocorrect\"\n              [attr.spellcheck]=\"spellcheck\"\n              [minlength]=\"minlength\"\n              [maxlength]=\"maxlength\"\n              [required]=\"required\"\n              (change)=\"onChange($event)\"\n              (keyup)=\"onKeyUp($event)\"\n              (focus)=\"onFocus($event)\"\n              (blur)=\"onBlur($event)\"\n              (click)=\"click.emit($event)\"\n              #inputModel=\"ngModel\"\n              #textareaControl>\n            </textarea>\n            <input\n              *ngIf=\"type !== 'textarea'\"\n              class=\"ngx-input-box\"\n              [(ngModel)]=\"value\"\n              [hidden]=\"passwordTextVisible\"\n              [id]=\"id\"\n              [name]=\"name\"\n              [placeholder]=\"placeholder\"\n              [disabled]=\"disabled\"\n              [type]=\"type\"\n              [min]=\"min\"\n              [max]=\"max\"\n              [minlength]=\"minlength\"\n              [maxlength]=\"maxlength\"\n              [attr.tabindex]=\"tabindex\"\n              [attr.autocomplete]=\"autocomplete\"\n              [attr.autocorrect]=\"autocorrect\"\n              [attr.spellcheck]=\"spellcheck\"\n              (change)=\"onChange($event)\"\n              (keyup)=\"onKeyUp($event)\"\n              (focus)=\"onFocus($event)\"\n              (blur)=\"onBlur($event)\"\n              (click)=\"click.emit($event)\"\n              [required]=\"required\"\n              #inputModel=\"ngModel\"\n              #inputControl\n            />\n            <input\n              *ngIf=\"passwordToggleEnabled\"\n              [hidden]=\"!passwordTextVisible\"\n              type=\"text\"\n              class=\"ngx-input-box\"\n              type=\"text\"\n              [id]=\"id + '-password'\"\n              [placeholder]=\"placeholder\"\n              [name]=\"name\"\n              [disabled]=\"disabled\"\n              [minlength]=\"minlength\"\n              [maxlength]=\"maxlength\"\n              [attr.autocomplete]=\"autocomplete\"\n              [attr.autocorrect]=\"autocorrect\"\n              [attr.spellcheck]=\"spellcheck\"\n              [attr.tabindex]=\"tabindex\"\n              [(ngModel)]=\"value\"\n              (change)=\"onChange($event)\"\n              (keyup)=\"onKeyUp($event)\"\n              (focus)=\"onFocus($event)\"\n              (blur)=\"onBlur($event)\"\n              (click)=\"click.emit($event)\"\n              [required]=\"required\"\n              #inputTextModel=\"ngModel\"\n              #passwordControl\n            />\n            <span\n              *ngIf=\"type === 'password' && passwordToggleEnabled\"\n              class=\"icon-eye\"\n              title=\"Toggle Text Visibility\"\n              (click)=\"togglePassword()\">\n            </span>\n          </div>\n          <span\n            class=\"ngx-input-label\"\n            [@labelState]=\"labelState\">\n            <span [innerHTML]=\"label\"></span> <span [innerHTML]=\"requiredIndicatorView\"></span>\n          </span>\n        </div>\n        <ng-content select=\"ngx-input-suffix\"></ng-content>\n      </div>\n      <div class=\"ngx-input-underline\">\n        <div\n          class=\"underline-fill\"\n          [@underlineState]=\"underlineState\">\n        </div>\n      </div>\n      <div class=\"ngx-input-hint\">\n        <ng-content select=\"ngx-input-hint\"></ng-content>\n        <span *ngIf=\"hint\" [innerHTML]=\"hint\"></span>\n      </div>\n    </div>\n  ",
            animations: [
                trigger('labelState', [
                    state('inside', style({
                        'font-size': '1em',
                        top: '0',
                    })),
                    state('outside', style({
                        'font-size': '.7rem',
                        top: '-15px',
                    })),
                    transition('inside => outside', animate('150ms ease-out')),
                    transition('outside => inside', animate('150ms ease-out'))
                ]),
                trigger('underlineState', [
                    state('collapsed', style({
                        width: '0%',
                    })),
                    state('expanded', style({
                        width: '100%',
                    })),
                    transition('collapsed => expanded', animate('150ms ease-out')),
                    transition('expanded => collapsed', animate('150ms ease-out'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], InputComponent);
    return InputComponent;
}());
export { InputComponent };
//# sourceMappingURL=input.component.js.map