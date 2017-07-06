import { Component, Input, Output, EventEmitter, ContentChildren, forwardRef, ElementRef, Renderer, HostBinding, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOptionDirective } from './select-option.directive';
import { SelectInputComponent } from './select-input.component';
import { KeyboardKeys } from '../../utils/keys';
var nextId = 0;
var SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SelectComponent; }),
    multi: true
};
var SelectComponent = (function () {
    function SelectComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.id = "select-" + ++nextId;
        this.autofocus = false;
        this.allowClear = true;
        this.allowAdditions = false;
        this.disableDropdown = false;
        this.closeOnBodyClick = true;
        this.options = [];
        this.filterable = true;
        this.placeholder = '';
        this.emptyPlaceholder = 'No options available';
        this.filterEmptyPlaceholder = 'No matches...';
        this.filterPlaceholder = 'Filter options...';
        this.tagging = false;
        this.multiple = false;
        this.disabled = false;
        this.change = new EventEmitter();
        this.keyup = new EventEmitter();
        this.toggle = new EventEmitter();
        this.dropdownActive = false;
        this.focusIndex = -1;
        this._value = [];
        this.onTouchedCallback = function () {
            // placeholder
        };
        this.onChangeCallback = function () {
            // placeholder
        };
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
SelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-select',
                providers: [SELECT_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
                styleUrls: ['./select.component.scss'],
                template: "\n    <div class=\"ngx-select-wrap\">\n      <ngx-select-input\n        [autofocus]=\"autofocus\"\n        [options]=\"options\"\n        [allowClear]=\"allowClear\"\n        [label]=\"label\"\n        [placeholder]=\"placeholder\"\n        [multiple]=\"multiple\"\n        [identifier]=\"identifier\"\n        [tagging]=\"tagging\"\n        [allowAdditions]=\"allowAdditions\"\n        [selected]=\"value\"\n        [hint]=\"hint\"\n        [disableDropdown]=\"disableDropdown\"\n        (keyup)=\"onKeyUp($event)\"\n        (toggle)=\"onToggle()\"\n        (activate)=\"onFocus()\"\n        (selection)=\"onInputSelection($event)\">\n      </ngx-select-input>\n      <ngx-select-dropdown\n        *ngIf=\"dropdownVisible\"\n        [focusIndex]=\"focusIndex\"\n        [filterQuery]=\"filterQuery\"\n        [filterPlaceholder]=\"filterPlaceholder\"\n        [allowAdditions]=\"allowAdditions\"\n        [selected]=\"value\"\n        [groupBy]=\"groupBy\"\n        [emptyPlaceholder]=\"emptyPlaceholder\"\n        [tagging]=\"tagging\"\n        [filterEmptyPlaceholder]=\"filterEmptyPlaceholder\"\n        [filterable]=\"filterable\"\n        [identifier]=\"identifier\"\n        [options]=\"options\"\n        (keyup)=\"keyup.emit($event)\"\n        (close)=\"onClose()\"\n        (selection)=\"onDropdownSelection($event)\">\n      </ngx-select-dropdown>\n    </div>\n  ",
                host: {
                    class: 'ngx-select'
                }
            },] },
];
/** @nocollapse */
SelectComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
]; };
SelectComponent.propDecorators = {
    'id': [{ type: HostBinding, args: ['id',] }, { type: Input },],
    'name': [{ type: HostBinding, args: ['attr.name',] }, { type: Input },],
    'label': [{ type: Input },],
    'hint': [{ type: Input },],
    'autofocus': [{ type: Input },],
    'allowClear': [{ type: Input },],
    'allowAdditions': [{ type: Input },],
    'disableDropdown': [{ type: Input },],
    'closeOnSelect': [{ type: Input },],
    'closeOnBodyClick': [{ type: Input },],
    'options': [{ type: Input },],
    'identifier': [{ type: Input },],
    'maxSelections': [{ type: Input },],
    'groupBy': [{ type: Input },],
    'filterable': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'emptyPlaceholder': [{ type: Input },],
    'filterEmptyPlaceholder': [{ type: Input },],
    'filterPlaceholder': [{ type: Input },],
    'tagging': [{ type: HostBinding, args: ['class.tagging-selection',] }, { type: Input },],
    'multiple': [{ type: HostBinding, args: ['class.multi-selection',] }, { type: Input },],
    'isSingleSelect': [{ type: HostBinding, args: ['class.single-selection',] },],
    'disabled': [{ type: HostBinding, args: ['class.disabled',] }, { type: Input },],
    'change': [{ type: Output },],
    'keyup': [{ type: Output },],
    'toggle': [{ type: Output },],
    'optionTemplates': [{ type: ContentChildren, args: [SelectOptionDirective,] },],
    'dropdownActive': [{ type: HostBinding, args: ['class.active',] },],
    'hasSelections': [{ type: HostBinding, args: ['class.active-selections',] },],
    'inputComponent': [{ type: ViewChild, args: [SelectInputComponent,] },],
};
//# sourceMappingURL=select.component.js.map