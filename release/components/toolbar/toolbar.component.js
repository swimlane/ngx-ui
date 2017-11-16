var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToolbarTitleDirective } from './toolbar-title.directive';
import { ToolbarContentDirective } from './toolbar-content.directive';
var ToolbarComponent = /** @class */ (function () {
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ToolbarComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ToolbarComponent.prototype, "subtitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ToolbarComponent.prototype, "menu", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ToolbarComponent.prototype, "menuClick", void 0);
    __decorate([
        ViewChild(ToolbarTitleDirective),
        __metadata("design:type", ToolbarTitleDirective)
    ], ToolbarComponent.prototype, "toolbarTitle", void 0);
    __decorate([
        ViewChild(ToolbarContentDirective),
        __metadata("design:type", ToolbarContentDirective)
    ], ToolbarComponent.prototype, "toolbarContent", void 0);
    ToolbarComponent = __decorate([
        Component({
            selector: 'ngx-toolbar',
            template: "\n    <header class=\"flex-container\" fxLayout=\"row\" fxLayoutWrap=\"nowrap\" fxFill fxLayoutGap=\"5px\">\n      <div class=\"ngx-toolbar-title-col\" fxFlex>\n        <ng-content *ngIf=\"!title\" select=\"ngx-toolbar-title\"></ng-content>\n        <h2 class=\"ngx-toolbar-title\" *ngIf=\"title\">\n          {{title}}\n          <small *ngIf=\"subtitle\">{{subtitle}}</small>\n        </h2>\n      </div>\n      <div class=\"ngx-toolbar-content-col\" fxFlex>\n        <ng-content *ngIf=\"!menu\" select=\"ngx-toolbar-content\"></ng-content>\n        <ul class=\"horizontal-list ngx-toolbar-menu\" *ngIf=\"menu\">\n          <li *ngFor=\"let item of toolbarItems\">\n            <button\n              type=\"button\"\n              [disabled]=\"item.disabled\"\n              (click)=\"onMenuClicked(item, $event)\">\n              {{item.label}}\n            </button>\n          </li>\n          <li *ngIf=\"dropdownItems.length\">\n            <ngx-dropdown>\n              <ngx-dropdown-toggle>\n                <button type=\"button\">\n                  ...\n                </button>\n              </ngx-dropdown-toggle>\n              <ngx-dropdown-menu class=\"align-right\">\n                <ul class=\"vertical-list\">\n                  <li *ngFor=\"let item of dropdownItems\">\n                    <button\n                      type=\"button\"\n                      (click)=\"onMenuClicked(item, $event)\">\n                      {{item.label}}\n                    </button>\n                  </li>\n                </ul>\n              </ngx-dropdown-menu>\n            </ngx-dropdown>\n          </li>\n        </ul>\n      </div>\n    </header>\n  ",
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./toolbar.component.css'],
            host: {
                class: 'ngx-toolbar'
            }
        })
    ], ToolbarComponent);
    return ToolbarComponent;
}());
export { ToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map