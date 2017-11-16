var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '../overlay';
import { InjectionService } from '../../services';
import { DrawerComponent } from './drawer.component';
import { DrawerService } from './drawer.service';
var DrawerModule = /** @class */ (function () {
    function DrawerModule() {
    }
    DrawerModule = __decorate([
        NgModule({
            declarations: [DrawerComponent],
            exports: [DrawerComponent],
            providers: [DrawerService, InjectionService],
            imports: [CommonModule, OverlayModule],
            entryComponents: [DrawerComponent]
        })
    ], DrawerModule);
    return DrawerModule;
}());
export { DrawerModule };
//# sourceMappingURL=drawer.module.js.map