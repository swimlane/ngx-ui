import { Component, Input, Output, ContentChildren, QueryList, EventEmitter, ViewEncapsulation, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab.component';
var TabsComponent = /** @class */ (function () {
    function TabsComponent() {
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
    return TabsComponent;
}());
export { TabsComponent };
//# sourceMappingURL=tabs.component.js.map