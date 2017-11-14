import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { KeyboardKeys } from '../../utils/keys';
var SelectInputComponent = /** @class */ (function () {
    function SelectInputComponent() {
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
            if (this.disableDropdown)
                return false;
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
        if (this.disableDropdown)
            return;
        event.stopPropagation();
        if (!this.tagging) {
            this.keyup.emit({ event: event });
        }
    };
    SelectInputComponent.prototype.onClick = function (event) {
        var _this = this;
        if (this.disableDropdown)
            return;
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
            if (_this.identifier !== undefined) {
                return option.value[_this.identifier] !== selection[_this.identifier];
            }
            return option.value !== selection;
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
//# sourceMappingURL=select-input.component.js.map