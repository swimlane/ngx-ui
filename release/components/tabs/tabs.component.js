var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, ContentChildren, QueryList, EventEmitter, ViewEncapsulation } from '@angular/core';
import { TabComponent } from './tab.component';
var TabsComponent = /** @class */ (function () {
    function TabsComponent() {
        this.select = new EventEmitter();
    }
    Object.defineProperty(TabsComponent.prototype, "index", {
        get: function () {
            var tabs = this.tabs.toArray();
            return tabs.findIndex(function (tab) { return tab.active; });
        },
        enumerable: true,
        configurable: true
    });
    TabsComponent.prototype.ngAfterContentInit = function () {
        var tabs = this.tabs.toArray();
        var actives = this.tabs.filter(function (t) { return t.active; });
        if (actives.length > 1) {
            console.error("Multiple active tabs set 'active'");
        }
        else if (!actives.length && tabs.length) {
            tabs[0].active = true;
        }
    };
    TabsComponent.prototype.tabClicked = function (activeTab) {
        var tabs = this.tabs.toArray();
        tabs.forEach(function (tab) { return tab.active = false; });
        activeTab.active = true;
        this.select.emit(activeTab);
    };
    TabsComponent.prototype.move = function (offset) {
        var tabs = this.tabs.toArray();
        for (var i = this.index + offset; i < tabs.length && i >= 0; i += offset) {
            var tab = tabs[i];
            if (tab && !tab.disabled) {
                this.tabClicked(tabs[i]);
                return;
            }
        }
    };
    TabsComponent.prototype.next = function () {
        this.move(1);
    };
    TabsComponent.prototype.prev = function () {
        this.move(-1);
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TabsComponent.prototype, "vertical", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TabsComponent.prototype, "select", void 0);
    __decorate([
        ContentChildren(TabComponent),
        __metadata("design:type", QueryList)
    ], TabsComponent.prototype, "tabs", void 0);
    TabsComponent = __decorate([
        Component({
            selector: 'ngx-tabs',
            template: "\n    <section>\n      <ul\n        class=\"ngx-tabs-list list-reset\"\n        [class.tabs-vertical]=\"vertical\"\n        [class.tabs-horizontal]=\"!vertical\">\n        <li\n          *ngFor=\"let tab of tabs\"\n          class=\"ngx-tab\"\n          [class.disabled]=\"tab.disabled\"\n          [class.active]=\"tab.active\">\n          <button\n            (click)=\"tabClicked(tab)\"\n            [disabled]=\"tab.disabled\">\n            {{tab.title}}\n          </button>\n        </li>\n      </ul>\n      <div class=\"ngx-tab-content\">\n        <ng-content></ng-content>\n      </div>\n    </section>\n  ",
            host: {
                class: 'ngx-tabs'
            },
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./tabs.component.css']
        })
    ], TabsComponent);
    return TabsComponent;
}());
export { TabsComponent };
//# sourceMappingURL=tabs.component.js.map