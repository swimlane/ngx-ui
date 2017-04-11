import { Component, Input, Output, ContentChildren, EventEmitter, ViewEncapsulation } from '@angular/core';
import { TabComponent } from './tab.component';
var TabsComponent = (function () {
    function TabsComponent() {
        this.select = new EventEmitter();
    }
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
    return TabsComponent;
}());
export { TabsComponent };
TabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-tabs',
                template: "\n    <section>\n      <ul\n        class=\"ngx-tabs-list list-reset\"\n        [class.tabs-vertical]=\"vertical\"\n        [class.tabs-horizontal]=\"!vertical\">\n        <li\n          *ngFor=\"let tab of tabs\"\n          class=\"ngx-tab\"\n          [class.disabled]=\"tab.disabled\"\n          [class.active]=\"tab.active\">\n          <button\n            (click)=\"tabClicked(tab)\"\n            [disabled]=\"tab.disabled\">\n            {{tab.title}}\n          </button>\n        </li>\n      </ul>\n      <div class=\"ngx-tab-content\">\n        <ng-content></ng-content>\n      </div>\n    </section>\n  ",
                host: {
                    class: 'ngx-tabs'
                },
                encapsulation: ViewEncapsulation.None,
                styleUrls: ['./tabs.component.scss']
            },] },
];
/** @nocollapse */
TabsComponent.ctorParameters = function () { return []; };
TabsComponent.propDecorators = {
    'vertical': [{ type: Input },],
    'select': [{ type: Output },],
    'tabs': [{ type: ContentChildren, args: [TabComponent,] },],
};
//# sourceMappingURL=tabs.component.js.map