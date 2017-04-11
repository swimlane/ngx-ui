import { Component, Input, Output, EventEmitter, trigger, HostBinding, state, style, transition, animate, ViewEncapsulation, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTypes } from './input-types';
var nextId = 0;
var INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return InputComponent; }),
    multi: true
};
var InputComponent = (function () {
    function InputComponent() {
        this.id = "input-" + ++nextId;
        this.label = '';
        this.type = InputTypes.text;
        this.placeholder = '';
        this.disabled = false;
        this.required = false;
        this.requiredIndicator = '*';
        this.passwordToggleEnabled = false;
        this.passwordTextVisible = false;
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
            return this.focused || (this.value && this.value.length);
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
        event.stopPropagation();
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
InputComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-input',
                providers: [INPUT_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
                styleUrls: ['./input.component.scss'],
                template: "\n    <div\n      class=\"ngx-input-wrap\"\n      [ngClass]=\"getCssClasses\">\n      <div class=\"ngx-input-box-wrap\">\n        <textarea\n          *ngIf=\"type === 'textarea'\"\n          class=\"ngx-input-textarea\"\n          rows=\"1\"\n          autosize\n          [(ngModel)]=\"value\"\n          [id]=\"id\"\n          [name]=\"name\"\n          [placeholder]=\"placeholder\"\n          [disabled]=\"disabled\"\n          [attr.tabindex]=\"tabindex\"\n          [attr.autocomplete]=\"autocomplete\"\n          [attr.autocorrect]=\"autocorrect\"\n          [attr.spellcheck]=\"spellcheck\"\n          [required]=\"required\"\n          (change)=\"onChange($event)\"\n          (keyup)=\"onKeyUp($event)\"\n          (focus)=\"onFocus($event)\"\n          (blur)=\"onBlur($event)\"\n          (click)=\"click.emit($event)\"\n          #inputModel=\"ngModel\"\n          #textareaControl>\n        </textarea>\n        <input\n          *ngIf=\"type !== 'textarea'\"\n          class=\"ngx-input-box\"\n          [(ngModel)]=\"value\"\n          [hidden]=\"passwordTextVisible\"\n          [id]=\"id\"\n          [name]=\"name\"\n          [placeholder]=\"placeholder\"\n          [disabled]=\"disabled\"\n          [type]=\"type\"\n          [min]=\"min\"\n          [max]=\"max\"\n          [minlength]=\"minlength\"\n          [maxlength]=\"maxlength\"\n          [attr.tabindex]=\"tabindex\"\n          [attr.autocomplete]=\"autocomplete\"\n          [attr.autocorrect]=\"autocorrect\"\n          [attr.spellcheck]=\"spellcheck\"\n          (change)=\"onChange($event)\"\n          (keyup)=\"onKeyUp($event)\"\n          (focus)=\"onFocus($event)\"\n          (blur)=\"onBlur($event)\"\n          (click)=\"click.emit($event)\"\n          [required]=\"required\"\n          #inputModel=\"ngModel\"\n          #inputControl\n        />\n        <input\n          *ngIf=\"passwordToggleEnabled\"\n          [hidden]=\"!passwordTextVisible\"\n          type=\"text\"\n          class=\"ngx-input-box\"\n          type=\"text\"\n          [id]=\"id\"\n          [placeholder]=\"placeholder\"\n          [name]=\"name\"\n          [disabled]=\"disabled\"\n          [attr.autocomplete]=\"autocomplete\"\n          [attr.autocorrect]=\"autocorrect\"\n          [attr.spellcheck]=\"spellcheck\"\n          [attr.tabindex]=\"tabindex\"\n          [(ngModel)]=\"value\"\n          (change)=\"onChange($event)\"\n          (keyup)=\"onKeyUp($event)\"\n          (focus)=\"onFocus($event)\"\n          (blur)=\"onBlur($event)\"\n          (click)=\"click.emit($event)\"\n          [required]=\"required\"\n          #inputTextModel=\"ngModel\"\n          #passwordControl\n        />\n        <span\n          *ngIf=\"type === 'password' && passwordToggleEnabled\"\n          class=\"icon-eye\"\n          title=\"Toggle Text Visibility\"\n          (click)=\"togglePassword()\">\n        </span>\n      </div>\n      <span\n        class=\"ngx-input-label\"\n        [@labelState]=\"labelState\">\n        <span [innerHTML]=\"label\"></span> <span [innerHTML]=\"requiredIndicatorView\"></span>\n      </span>\n      <div class=\"ngx-input-underline\">\n        <div\n          class=\"underline-fill\"\n          [@underlineState]=\"underlineState\">\n        </div>\n      </div>\n      <div class=\"ngx-input-hint\">\n        <span *ngIf=\"hint\" [innerHTML]=\"hint\"></span>\n        <ng-content select=\"ngx-input-hint\"></ng-content>\n      </div>\n    </div>\n  ",
                animations: [
                    trigger('labelState', [
                        state('inside', style({
                            'font-size': '1rem',
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
            },] },
];
/** @nocollapse */
InputComponent.ctorParameters = function () { return []; };
InputComponent.propDecorators = {
    'id': [{ type: Input },],
    'name': [{ type: Input },],
    'label': [{ type: Input },],
    'type': [{ type: Input },],
    'hint': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'disabled': [{ type: Input },],
    'tabindex': [{ type: Input },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'minlength': [{ type: Input },],
    'maxlength': [{ type: Input },],
    'required': [{ type: Input },],
    'requiredIndicator': [{ type: Input },],
    'passwordToggleEnabled': [{ type: Input },],
    'passwordTextVisible': [{ type: Input },],
    'autofocus': [{ type: Input },],
    'autocomplete': [{ type: Input },],
    'autocorrect': [{ type: Input },],
    'spellcheck': [{ type: Input },],
    'change': [{ type: Output },],
    'blur': [{ type: Output },],
    'focus': [{ type: Output },],
    'keyup': [{ type: Output },],
    'click': [{ type: Output },],
    'getHostCssClasses': [{ type: HostBinding, args: ['class',] },],
    'inputModel': [{ type: ViewChild, args: ['inputModel',] },],
    'inputControl': [{ type: ViewChild, args: ['inputControl',] },],
    'textareaControl': [{ type: ViewChild, args: ['textareaControl',] },],
    'passwordControl': [{ type: ViewChild, args: ['passwordControl',] },],
};
//# sourceMappingURL=input.component.js.map