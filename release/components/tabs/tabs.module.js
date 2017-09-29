import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';
import { IfTabActiveDirective } from './if-tab-active.directive';
var TabsModule = /** @class */ (function () {
    function TabsModule() {
    }
    TabsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [TabComponent, TabsComponent, IfTabActiveDirective],
                    exports: [TabComponent, TabsComponent, IfTabActiveDirective],
                    imports: [CommonModule]
                },] },
    ];
    /** @nocollapse */
    TabsModule.ctorParameters = function () { return []; };
    return TabsModule;
}());
export { TabsModule };
//# sourceMappingURL=tabs.module.js.map