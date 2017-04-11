import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { KeyboardKeys } from '../../utils/keys';
var SelectInputComponent = (function () {
    function SelectInputComponent() {
        this.toggle = new EventEmitter();
        this.selection = new EventEmitter();
        this.activate = new EventEmitter();
        this.keyup = new EventEmitter();
        this.selectedOptions = [];
    }
    Object.defineProperty(SelectInputComponent.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (val) {
            this._selected = val;
            this.selectedOptions = this.calcSelectedOptions(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectInputComponent.prototype, "caretVisible", {
        get: function () {
            if (this.tagging && (!this.options || !this.options.length))
                return false;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    SelectInputComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.tagging && this.autofocus) {
            setTimeout(function () {
                _this.inputElement.nativeElement.focus();
            }, 5);
        }
    };
    SelectInputComponent.prototype.onKeyUp = function (event) {
        event.stopPropagation();
        var key = event.key;
        var value = event.target.value;
        if (key === KeyboardKeys.ENTER && value !== '') {
            var hasSelection = this.selected.find(function (selection) {
                return value === selection;
            });
            if (!hasSelection) {
                var newSelections = this.selected.concat([value]);
                this.selection.emit(newSelections);
                event.target.value = '';
            }
        }
        else if (key === KeyboardKeys.ESCAPE) {
            this.toggle.emit();
        }
        this.keyup.emit({ event: event, value: value });
    };
    SelectInputComponent.prototype.onKeyDown = function (event) {
        event.stopPropagation();
        if (!this.tagging) {
            this.keyup.emit({ event: event });
        }
    };
    SelectInputComponent.prototype.onClick = function (event) {
        var _this = this;
        this.activate.emit(event);
        if (this.tagging) {
            setTimeout(function () {
                _this.inputElement.nativeElement.focus();
            }, 5);
        }
    };
    SelectInputComponent.prototype.onOptionRemove = function (event, option) {
        var _this = this;
        event.stopPropagation();
        var newSelections = this.selected.filter(function (selection) {
            var value = _this.identifier ? option.value[_this.identifier] : option.value;
            return value !== selection;
        });
        this.selection.emit(newSelections);
    };
    SelectInputComponent.prototype.calcSelectedOptions = function (selected) {
        var _this = this;
        var results = [];
        // result out if nothing here
        if (!selected)
            return results;
        var _loop_1 = function (selection) {
            var match = void 0;
            if (this_1.options) {
                match = this_1.options.find(function (option) {
                    if (_this.identifier)
                        return selection[_this.identifier] === option.value[_this.identifier];
                    return selection === option.value;
                });
            }
            if ((this_1.tagging || this_1.allowAdditions) && !match) {
                match = { value: selection, name: selection };
            }
            if (match)
                results.push(match);
        };
        var this_1 = this;
        for (var _i = 0, selected_1 = selected; _i < selected_1.length; _i++) {
            var selection = selected_1[_i];
            _loop_1(selection);
        }
        return results;
    };
    return SelectInputComponent;
}());
export { SelectInputComponent };
SelectInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-select-input',
                template: "\n    <div>\n      <div\n        tabindex=\"-1\"\n        (keydown)=\"onKeyDown($event)\"\n        class=\"ngx-select-input-box\"\n        (click)=\"onClick($event)\">\n        <span\n          *ngIf=\"label\"\n          class=\"ngx-select-label\">\n          <span [innerHTML]=\"label\"></span>\n        </span>\n        <span\n          *ngIf=\"!selected?.length && placeholder\"\n          class=\"ngx-select-placeholder\"\n          [innerHTML]=\"placeholder\">\n        </span>\n        <ul\n          class=\"horizontal-list ngx-select-input-list\">\n          <li\n            *ngFor=\"let option of selectedOptions\"\n            class=\"ngx-select-input-option\"\n            [class.disabled]=\"option.disabled\">\n            <ng-template\n              *ngIf=\"option.inputTemplate\"\n              [ngTemplateOutlet]=\"option.inputTemplate\"\n              [ngOutletContext]=\"{ option: option }\">\n            </ng-template>\n            <span\n              *ngIf=\"!option.inputTemplate\"\n              class=\"ngx-select-input-name\"\n              [innerHTML]=\"option.name || option.value\">\n            </span>\n            <span\n              *ngIf=\"allowClear && (multiple || tagging) && !option.disabled\"\n              title=\"Remove Selection\"\n              class=\"ngx-select-clear icon-x\"\n              (click)=\"onOptionRemove($event, option)\">\n            </span>\n          </li>\n          <li *ngIf=\"tagging\">\n            <input\n              #tagInput\n              type=\"search\"\n              class=\"ng-select-text-box\"\n              tabindex=\"\"\n              autocomplete=\"off\"\n              autocorrect=\"off\"\n              spellcheck=\"off\"\n              (keyup)=\"onKeyUp($event)\"\n            />\n          </li>\n        </ul>\n      </div>\n      <div class=\"ngx-select-input-underline\">\n        <div class=\"underline-fill\"></div>\n      </div>\n      <span\n        *ngIf=\"allowClear && !multiple && !tagging && selectedOptions?.length\"\n        title=\"Clear Selections\"\n        class=\"ngx-select-clear icon-x\"\n        (click)=\"selection.emit([])\">\n      </span>\n      <span\n        *ngIf=\"caretVisible\"\n        class=\"ngx-select-caret icon-arrow-down\"\n        (click)=\"toggle.emit()\">\n      </span>\n    </div>\n  ",
                host: {
                    class: 'ngx-select-input'
                }
            },] },
];
/** @nocollapse */
SelectInputComponent.ctorParameters = function () { return []; };
SelectInputComponent.propDecorators = {
    'placeholder': [{ type: Input },],
    'autofocus': [{ type: Input },],
    'allowClear': [{ type: Input },],
    'multiple': [{ type: Input },],
    'tagging': [{ type: Input },],
    'identifier': [{ type: Input },],
    'options': [{ type: Input },],
    'label': [{ type: Input },],
    'allowAdditions': [{ type: Input },],
    'selected': [{ type: Input },],
    'toggle': [{ type: Output },],
    'selection': [{ type: Output },],
    'activate': [{ type: Output },],
    'keyup': [{ type: Output },],
    'inputElement': [{ type: ViewChild, args: ['tagInput',] },],
};
//# sourceMappingURL=select-input.component.js.map