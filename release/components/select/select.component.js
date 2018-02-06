var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, QueryList, ContentChildren, forwardRef, ElementRef, Renderer, HostBinding, ViewChild, ViewEncapsulation } from '@angular/core';
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
var SelectComponent = /** @class */ (function () {
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
            return this.value && this.value.length > 0 && typeof this.value[0] !== 'undefined';
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
    __decorate([
        HostBinding('id'),
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "id", void 0);
    __decorate([
        HostBinding('attr.name'),
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "hint", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "autofocus", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "allowClear", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "allowAdditions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "disableDropdown", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "closeOnSelect", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "closeOnBodyClick", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SelectComponent.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "identifier", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SelectComponent.prototype, "maxSelections", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "groupBy", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "filterable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "emptyPlaceholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "filterEmptyPlaceholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "filterPlaceholder", void 0);
    __decorate([
        HostBinding('class.tagging-selection'),
        Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "tagging", void 0);
    __decorate([
        HostBinding('class.multi-selection'),
        Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "multiple", void 0);
    __decorate([
        HostBinding('class.single-selection'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], SelectComponent.prototype, "isSingleSelect", null);
    __decorate([
        HostBinding('class.disabled'),
        Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "disabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectComponent.prototype, "change", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectComponent.prototype, "keyup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectComponent.prototype, "toggle", void 0);
    __decorate([
        ContentChildren(SelectOptionDirective),
        __metadata("design:type", QueryList),
        __metadata("design:paramtypes", [QueryList])
    ], SelectComponent.prototype, "optionTemplates", null);
    __decorate([
        HostBinding('class.active'),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "dropdownActive", void 0);
    __decorate([
        HostBinding('class.active-selections'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], SelectComponent.prototype, "hasSelections", null);
    __decorate([
        HostBinding('class.has-placeholder'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], SelectComponent.prototype, "hasPlaceholder", null);
    __decorate([
        ViewChild(SelectInputComponent),
        __metadata("design:type", SelectInputComponent)
    ], SelectComponent.prototype, "inputComponent", void 0);
    SelectComponent = __decorate([
        Component({
            selector: 'ngx-select',
            providers: [SELECT_VALUE_ACCESSOR],
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./select.component.css'],
            template: "\n    <div class=\"ngx-select-wrap\">\n      <div class=\"ngx-select-flex-wrap\">\n        <div class=\"ngx-select-flex-wrap-inner\">\n          <ngx-select-input\n            [autofocus]=\"autofocus\"\n            [options]=\"options\"\n            [allowClear]=\"allowClear\"\n            [label]=\"label\"\n            [placeholder]=\"placeholder\"\n            [multiple]=\"multiple\"\n            [identifier]=\"identifier\"\n            [tagging]=\"tagging\"\n            [allowAdditions]=\"allowAdditions\"\n            [selected]=\"value\"\n            [hint]=\"hint\"\n            [disableDropdown]=\"disableDropdown\"\n            (keyup)=\"onKeyUp($event)\"\n            (toggle)=\"onToggle()\"\n            (activate)=\"onFocus()\"\n            (selection)=\"onInputSelection($event)\">\n          </ngx-select-input>\n        </div>\n      </div>\n      <ngx-select-dropdown\n        *ngIf=\"dropdownVisible\"\n        [focusIndex]=\"focusIndex\"\n        [filterQuery]=\"filterQuery\"\n        [filterPlaceholder]=\"filterPlaceholder\"\n        [allowAdditions]=\"allowAdditions\"\n        [selected]=\"value\"\n        [groupBy]=\"groupBy\"\n        [emptyPlaceholder]=\"emptyPlaceholder\"\n        [tagging]=\"tagging\"\n        [filterEmptyPlaceholder]=\"filterEmptyPlaceholder\"\n        [filterable]=\"filterable\"\n        [identifier]=\"identifier\"\n        [options]=\"options\"\n        (keyup)=\"keyup.emit($event)\"\n        (close)=\"onClose()\"\n        (selection)=\"onDropdownSelection($event)\">\n      </ngx-select-dropdown>\n    </div>\n  ",
            host: {
                class: 'ngx-select'
            }
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer])
    ], SelectComponent);
    return SelectComponent;
}());
export { SelectComponent };
//# sourceMappingURL=select.component.js.map