import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';
var TabsModule = (function () {
    function TabsModule() {
    }
    return TabsModule;
}());
export { TabsModule };
TabsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TabComponent, TabsComponent],
                exports: [TabComponent, TabsComponent],
                imports: [CommonModule]
            },] },
];
/** @nocollapse */
TabsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=tabs.module.js.map