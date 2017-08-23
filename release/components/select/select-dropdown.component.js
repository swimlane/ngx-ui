import { Component, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { KeyboardKeys } from '../../utils/keys';
import { containsFilter } from './select-helper';
var SelectDropdownComponent = (function () {
    function SelectDropdownComponent(elementRef) {
        this.keyup = new EventEmitter();
        this.selection = new EventEmitter();
        this.close = new EventEmitter();
        this.element = elementRef.nativeElement;
    }
    Object.defineProperty(SelectDropdownComponent.prototype, "focusIndex", {
        get: function () {
            return this._focusIndex;
        },
        set: function (val) {
            this._focusIndex = val;
            this.focusElement(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectDropdownComponent.prototype, "filterQuery", {
        get: function () {
            return this._filterQuery;
        },
        set: function (val) {
            this._filterQuery = val;
            this.groups = this.calculateGroups(this.groupBy, this.options, val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectDropdownComponent.prototype, "groupBy", {
        get: function () {
            return this._groupBy;
        },
        set: function (val) {
            this._groupBy = val;
            this.groups = this.calculateGroups(val, this.options);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectDropdownComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            this.groups = this.calculateGroups(this.groupBy, val);
            this._options = val;
        },
        enumerable: true,
        configurable: true
    });
    SelectDropdownComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.filterable && !this.tagging) {
            setTimeout(function () {
                _this.filterInput.nativeElement.focus();
            }, 5);
        }
    };
    SelectDropdownComponent.prototype.isSelected = function (option) {
        var _this = this;
        if (!this.selected || !this.selected.length)
            return false;
        var idx = this.selected.findIndex(function (o) {
            if (_this.identifier)
                return o[_this.identifier] === option.value[_this.identifier];
            return o === option.value;
        });
        return idx > -1;
    };
    SelectDropdownComponent.prototype.calculateGroups = function (groupBy, options, filter) {
        if (!options)
            return [];
        // no group by defined, skip and just return
        // emptry group object...
        if (!groupBy) {
            if (filter) {
                // filter options
                options = options.filter(function (o) {
                    return containsFilter(o, filter);
                });
            }
            // need to map indexes
            options = options.map(function (option, index) {
                return { option: option, index: index };
            });
            return [{ options: options }];
        }
        var map = new Map();
        var i = 0;
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            // only show items in filter criteria
            if (filter && !containsFilter(option, filter)) {
                continue;
            }
            var group = option.value[groupBy];
            var opt = map.get(group);
            // need to map the true indexes
            var kv = { option: option, index: i++ };
            if (!opt) {
                map.set(group, [kv]);
            }
            else {
                opt.push(kv);
            }
        }
        var result = [];
        map.forEach(function (value, key) {
            result.push({ name: key, options: value });
        });
        return result;
    };
    SelectDropdownComponent.prototype.onInputKeyUp = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var key = event.key;
        var value = event.target.value;
        if (key === KeyboardKeys.ESCAPE) {
            this.close.emit(true);
        }
        else if (event.key === KeyboardKeys.ARROW_DOWN) {
            ++this.focusIndex;
        }
        if (this.filterQuery !== value) {
            this.filterQuery = value;
        }
        this.keyup.emit({ event: event, value: value });
    };
    SelectDropdownComponent.prototype.onOptionKeyDown = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var key = event.key;
        if (key === KeyboardKeys.ARROW_DOWN) {
            if (this.focusIndex < (this.options.length - 1))
                ++this.focusIndex;
        }
        else if (key === KeyboardKeys.ARROW_UP) {
            if (this.focusIndex > 0)
                --this.focusIndex;
        }
        else if (key === KeyboardKeys.ENTER) {
            this.selection.emit(this.options[this.focusIndex]);
        }
    };
    SelectDropdownComponent.prototype.focusElement = function (index) {
        var elements = this.element.getElementsByClassName('ngx-select-dropdown-option');
        var element = elements[index];
        if (element) {
            setTimeout(function () { return element.focus(); }, 5);
        }
    };
    SelectDropdownComponent.prototype.onAddClicked = function (event, value) {
        event.preventDefault();
        event.stopPropagation();
        this.selection.emit({ value: value, name: value });
        event.target.value = '';
        this.close.emit();
    };
    SelectDropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-select-dropdown',
                    template: "\n    <div>\n      <div class=\"ngx-select-filter\" *ngIf=\"filterable && !tagging\">\n        <input\n          #filterInput\n          type=\"search\"\n          tabindex=\"\"\n          autocomplete=\"off\" \n          autocorrect=\"off\"\n          spellcheck=\"off\"\n          class=\"ngx-select-filter-input\"\n          [placeholder]=\"filterPlaceholder\"\n          (keyup)=\"onInputKeyUp($event)\"\n        />\n      </div>\n      <ul class=\"vertical-list ngx-select-dropdown-options\">\n        <li *ngFor=\"let group of groups\" class=\"ngx-select-option-group\">\n          <span \n            class=\"ngx-select-option-group-name\" \n            *ngIf=\"group.name\" \n            [innerHTML]=\"group.name\">\n          </span>\n          <ul class=\"vertical-list ngx-select-dropdown-options\">\n            <li \n              *ngFor=\"let kv of group.options\" \n              class=\"ngx-select-dropdown-option\"\n              [class.disabled]=\"kv.option.disabled\"\n              [class.active]=\"kv.index === focusIndex\"\n              [class.selected]=\"isSelected(kv.option)\"\n              tabindex=\"-1\" \n              (click)=\"selection.emit(kv.option)\"\n              (keydown)=\"onOptionKeyDown($event)\">\n              <ng-template\n                *ngIf=\"kv.option.optionTemplate\"\n                [ngTemplateOutlet]=\"kv.option.optionTemplate\"\n                [ngTemplateOutletContext]=\"{ option: kv.option }\">\n              </ng-template>\n              <span\n                *ngIf=\"!kv.option.optionTemplate\"\n                [innerHTML]=\"kv.option.name\">\n              </span>\n            </li>\n            <li \n              *ngIf=\"filterQuery && filterEmptyPlaceholder && !group.options?.length\"\n              class=\"ngx-select-empty-placeholder\">\n              <span \n                class=\"ngx-select-empty-placeholder-text\"\n                [innerHTML]=\"filterEmptyPlaceholder\">\n              </span>\n              <a \n                *ngIf=\"allowAdditions\"\n                href=\"#\"\n                class=\"ngx-select-empty-placeholder-add\"\n                (click)=\"onAddClicked($event, filterQuery)\">\n                Add Value\n              </a>\n            </li>\n            <li \n              *ngIf=\"!filterQuery && emptyPlaceholder && !group.options?.length\"\n              class=\"ngx-select-empty-placeholder\"\n              [innerHTML]=\"emptyPlaceholder\">\n            </li>\n          </ul>\n        </li>\n      </ul>\n    </div>\n  ",
                    host: {
                        class: 'ngx-select-dropdown'
                    }
                },] },
    ];
    /** @nocollapse */
    SelectDropdownComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    SelectDropdownComponent.propDecorators = {
        'selected': [{ type: Input },],
        'identifier': [{ type: Input },],
        'filterable': [{ type: Input },],
        'filterPlaceholder': [{ type: Input },],
        'filterEmptyPlaceholder': [{ type: Input },],
        'emptyPlaceholder': [{ type: Input },],
        'tagging': [{ type: Input },],
        'allowAdditions': [{ type: Input },],
        'focusIndex': [{ type: Input },],
        'filterQuery': [{ type: Input },],
        'groupBy': [{ type: HostBinding, args: ['class.groupings',] }, { type: Input },],
        'options': [{ type: Input },],
        'keyup': [{ type: Output },],
        'selection': [{ type: Output },],
        'close': [{ type: Output },],
        'filterInput': [{ type: ViewChild, args: ['filterInput',] },],
    };
    return SelectDropdownComponent;
}());
export { SelectDropdownComponent };
//# sourceMappingURL=select-dropdown.component.js.map