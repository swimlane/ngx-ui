var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon';
import { ToolbarModule } from '../toolbar';
import { NagComponent } from './nag.component';
var NagModule = /** @class */ (function () {
    function NagModule() {
    }
    NagModule = __decorate([
        NgModule({
            declarations: [NagComponent],
            exports: [NagComponent],
            imports: [CommonModule, ToolbarModule, IconModule],
            entryComponents: [NagComponent]
        })
    ], NagModule);
    return NagModule;
}());
export { NagModule };
//# sourceMappingURL=nag.module.js.map