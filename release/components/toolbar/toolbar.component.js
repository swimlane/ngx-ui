import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToolbarTitleDirective } from './toolbar-title.directive';
import { ToolbarContentDirective } from './toolbar-content.directive';
var ToolbarComponent = (function () {
    function ToolbarComponent() {
        this.menuClick = new EventEmitter();
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
    ToolbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-toolbar',
                    template: "\n    <header class=\"flex-container\" fxLayout=\"row\" fxLayoutWrap=\"nowrap\" fxFill fxLayoutGap=\"5px\">\n      <div class=\"ngx-toolbar-title-col\" fxFlex>\n        <ng-content *ngIf=\"!title\" select=\"ngx-toolbar-title\"></ng-content>\n        <h2 class=\"ngx-toolbar-title\" *ngIf=\"title\">\n          {{title}}\n          <small *ngIf=\"subtitle\">{{subtitle}}</small>\n        </h2>\n      </div>\n      <div class=\"ngx-toolbar-content-col\" fxFlex>\n        <ng-content *ngIf=\"!menu\" select=\"ngx-toolbar-content\"></ng-content>\n        <ul class=\"horizontal-list ngx-toolbar-menu\" *ngIf=\"menu\">\n          <li *ngFor=\"let item of toolbarItems\">\n            <button\n              type=\"button\"\n              [disabled]=\"item.disabled\"\n              (click)=\"onMenuClicked(item, $event)\">\n              {{item.label}}\n            </button>\n          </li>\n          <li *ngIf=\"dropdownItems.length\">\n            <ngx-dropdown>\n              <ngx-dropdown-toggle>\n                <button type=\"button\">\n                  ...\n                </button>\n              </ngx-dropdown-toggle>\n              <ngx-dropdown-menu class=\"align-right\">\n                <ul class=\"vertical-list\">\n                  <li *ngFor=\"let item of dropdownItems\">\n                    <button\n                      type=\"button\"\n                      (click)=\"onMenuClicked(item, $event)\">\n                      {{item.label}}\n                    </button>\n                  </li>\n                </ul>\n              </ngx-dropdown-menu>\n            </ngx-dropdown>\n          </li>\n        </ul>\n      </div>\n    </header>\n  ",
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./toolbar.component.css'],
                    host: {
                        class: 'ngx-toolbar'
                    }
                },] },
    ];
    /** @nocollapse */
    ToolbarComponent.ctorParameters = function () { return []; };
    ToolbarComponent.propDecorators = {
        'title': [{ type: Input },],
        'subtitle': [{ type: Input },],
        'menu': [{ type: Input },],
        'menuClick': [{ type: Output },],
        'toolbarTitle': [{ type: ViewChild, args: [ToolbarTitleDirective,] },],
        'toolbarContent': [{ type: ViewChild, args: [ToolbarContentDirective,] },],
    };
    return ToolbarComponent;
}());
export { ToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map