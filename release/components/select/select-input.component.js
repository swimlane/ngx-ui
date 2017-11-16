var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { KeyboardKeys } from '../../utils/keys';
var SelectInputComponent = /** @class */ (function () {
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectInputComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectInputComponent.prototype, "autofocus", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectInputComponent.prototype, "allowClear", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectInputComponent.prototype, "multiple", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectInputComponent.prototype, "tagging", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectInputComponent.prototype, "identifier", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SelectInputComponent.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectInputComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectInputComponent.prototype, "hint", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectInputComponent.prototype, "allowAdditions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectInputComponent.prototype, "disableDropdown", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], SelectInputComponent.prototype, "selected", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectInputComponent.prototype, "toggle", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectInputComponent.prototype, "selection", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectInputComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectInputComponent.prototype, "keyup", void 0);
    __decorate([
        ViewChild('tagInput'),
        __metadata("design:type", Object)
    ], SelectInputComponent.prototype, "inputElement", void 0);
    SelectInputComponent = __decorate([
        Component({
            selector: 'ngx-select-input',
            template: "\n      <div\n        tabindex=\"-1\"\n        (keydown)=\"onKeyDown($event)\"\n        class=\"ngx-select-input-box\"\n        (click)=\"onClick($event)\">\n        <span\n          *ngIf=\"label !== undefined\"\n          class=\"ngx-select-label\">\n          <span [innerHTML]=\"label\"></span>\n        </span>\n        <span\n          *ngIf=\"!selected?.length && placeholder !== undefined\"\n          class=\"ngx-select-placeholder\"\n          [innerHTML]=\"placeholder\">\n        </span>\n        <ul\n          class=\"horizontal-list ngx-select-input-list\">\n          <li\n            *ngFor=\"let option of selectedOptions\"\n            class=\"ngx-select-input-option\"\n            [class.disabled]=\"option.disabled\">\n            <ng-template\n              *ngIf=\"option.inputTemplate\"\n              [ngTemplateOutlet]=\"option.inputTemplate\"\n              [ngTemplateOutletContext]=\"{ option: option }\">\n            </ng-template>\n            <span\n              *ngIf=\"!option.inputTemplate\"\n              class=\"ngx-select-input-name\"\n              [innerHTML]=\"option.name || option.value\">\n            </span>\n            <span\n              *ngIf=\"allowClear && (multiple || tagging) && !option.disabled\"\n              title=\"Remove Selection\"\n              class=\"ngx-select-clear icon-x\"\n              (click)=\"onOptionRemove($event, option)\">\n            </span>\n          </li>\n          <li *ngIf=\"tagging\" class=\"ngx-select-input-box-wrapper\">\n            <input\n              #tagInput\n              type=\"search\"\n              class=\"ng-select-text-box\"\n              tabindex=\"\"\n              autocomplete=\"off\"\n              autocorrect=\"off\"\n              spellcheck=\"off\"\n              (keyup)=\"onKeyUp($event)\"\n            />\n          </li>\n        </ul>\n      </div>\n      <div class=\"ngx-select-input-underline\">\n        <div class=\"underline-fill\"></div>\n      </div>\n      <div class=\"ngx-select-hint\">\n        <span *ngIf=\"hint !== undefined\" [innerHTML]=\"hint\"></span>\n        <ng-content select=\"ngx-input-hint\"></ng-content>\n      </div>\n      <span\n        *ngIf=\"allowClear && !multiple && !tagging && selectedOptions?.length\"\n        title=\"Clear Selections\"\n        class=\"ngx-select-clear icon-x\"\n        (click)=\"selection.emit([])\">\n      </span>\n      <span\n        *ngIf=\"caretVisible\"\n        class=\"ngx-select-caret icon-arrow-down\"\n        (click)=\"toggle.emit()\">\n      </span>\n\n  ",
            host: {
                class: 'ngx-select-input'
            }
        })
    ], SelectInputComponent);
    return SelectInputComponent;
}());
export { SelectInputComponent };
//# sourceMappingURL=select-input.component.js.map