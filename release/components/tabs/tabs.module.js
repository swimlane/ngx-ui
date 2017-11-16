var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';
import { IfTabActiveDirective } from './if-tab-active.directive';
var TabsModule = /** @class */ (function () {
    function TabsModule() {
    }
    TabsModule = __decorate([
        NgModule({
            declarations: [TabComponent, TabsComponent, IfTabActiveDirective],
            exports: [TabComponent, TabsComponent, IfTabActiveDirective],
            imports: [CommonModule]
        })
    ], TabsModule);
    return TabsModule;
}());
export { TabsModule };
//# sourceMappingURL=tabs.module.js.map