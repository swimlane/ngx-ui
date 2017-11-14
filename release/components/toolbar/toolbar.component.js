import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToolbarTitleDirective } from './toolbar-title.directive';
import { ToolbarContentDirective } from './toolbar-content.directive';
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent() {
    }
    Object.defineProperty(ToolbarComponent.prototype, "toolbarItems", {
        get: function () {
            return this.menu.filter(function (m) {
                return !m.dropdown;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarComponent.prototype, "dropdownItems", {
        get: function () {
            return this.menu.filter(function (m) {
                return m.dropdown;
            });
        },
        enumerable: true,
        configurable: true
    });
    ToolbarComponent.prototype.onMenuClicked = function (item, $event) {
        if (item.click) {
            item.click($event);
        }
    };
    return ToolbarComponent;
}());
export { ToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map