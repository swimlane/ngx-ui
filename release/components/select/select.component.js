import { Component, Input, Output, EventEmitter, QueryList, ContentChildren, forwardRef, ElementRef, Renderer, OnDestroy, HostBinding, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { SelectOptionDirective } from './select-option.directive';
import { SelectInputComponent } from './select-input.component';
import { KeyboardKeys } from '../../utils/keys';
var nextId = 0;
var SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SelectComponent; }),
    multi: true
};
var SelectComponent = /** @class */ (function () {
    function SelectComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    Object.defineProperty(SelectComponent.prototype, "isSingleSelect", {
        get: function () {
            return !this.multiple && !this.tagging;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "optionTemplates", {
        get: function () {
            return this._optionTemplates;
        },
        set: function (val) {
            this._optionTemplates = val;
            if (val) {
                var arr = val.toArray();
                if (arr.length)
                    this.options = arr;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "hasSelections", {
        get: function () {
            return this.value && this.value.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "hasPlaceholder", {
        get: function () {
            return this.placeholder && this.placeholder.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (val) {
            if (val !== this._value) {
                this._value = val;
                this.onChangeCallback(this._value);
                this.change.emit(this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "dropdownVisible", {
        get: function () {
            if (this.disableDropdown)
                return false;
            if (this.tagging && (!this.options || !this.options.length))
                return false;
            return this.dropdownActive;
        },
        enumerable: true,
        configurable: true
    });
    SelectComponent.prototype.ngOnDestroy = function () {
        this.toggleDropdown(false);
    };
    SelectComponent.prototype.onDropdownSelection = function (selection) {
        var _this = this;
        if (selection.disabled)
            return;
        if (this.value.length === this.maxSelections)
            return;
        var idx = this.value.findIndex(function (o) {
            if (_this.identifier) {
                return o[_this.identifier] === selection.value[_this.identifier];
            }
            return o === selection.value;
        });
        if (idx === -1) {
            this.value = (this.multiple || this.tagging) ? this.value.concat([selection.value]) :
                [selection.value];
        }
        // if tagging, we need to clear current text
        if (this.tagging) {
            this.inputComponent.inputElement.nativeElement.value = '';
        }
        var shouldClose = this.closeOnSelect ||
            (this.closeOnSelect === undefined && !this.multiple);
        if (shouldClose) {
            this.toggleDropdown(false);
        }
    };
    SelectComponent.prototype.onInputSelection = function (selections) {
        this.value = selections;
    };
    SelectComponent.prototype.onFocus = function () {
        if (this.disabled)
            return;
        this.toggleDropdown(true);
        this.onTouchedCallback();
    };
    SelectComponent.prototype.onClear = function () {
        this.value = [];
    };
    SelectComponent.prototype.onBodyClick = function (event) {
        if (this.dropdownActive) {
            var contains = this.element.nativeElement.contains(event.target);
            if (!contains)
                this.toggleDropdown(false);
        }
    };
    SelectComponent.prototype.onClose = function () {
        this.toggleDropdown(false);
    };
    SelectComponent.prototype.onToggle = function () {
        if (this.disabled)
            return;
        this.toggleDropdown(!this.dropdownActive);
        this.onTouchedCallback();
    };
    SelectComponent.prototype.toggleDropdown = function (state) {
        if (this.dropdownActive === state)
            return;
        this.dropdownActive = state;
        if (this.toggleListener)
            this.toggleListener();
        this.toggle.emit(this.dropdownActive);
        if (state && this.closeOnBodyClick) {
            this.toggleListener = this.renderer.listen(document.body, 'click', this.onBodyClick.bind(this));
        }
    };
    SelectComponent.prototype.onKeyUp = function (_a) {
        var event = _a.event, value = _a.value;
        if (event && event.key === KeyboardKeys.ARROW_DOWN) {
            ++this.focusIndex;
        }
        else {
            this.filterQuery = value;
        }
        this.keyup.emit({ event: event, value: value });
    };
    SelectComponent.prototype.writeValue = function (val) {
        if (val !== this._value) {
            this._value = val;
        }
    };
    SelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    SelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return SelectComponent;
}());
export { SelectComponent };
//# sourceMappingURL=select.component.js.map