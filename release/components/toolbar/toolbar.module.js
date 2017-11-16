var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DropdownModule } from '../dropdown';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarTitleDirective } from './toolbar-title.directive';
import { ToolbarContentDirective } from './toolbar-content.directive';
var ToolbarModule = /** @class */ (function () {
    function ToolbarModule() {
    }
    ToolbarModule = __decorate([
        NgModule({
            declarations: [ToolbarComponent, ToolbarTitleDirective, ToolbarContentDirective],
            exports: [ToolbarComponent, ToolbarTitleDirective, ToolbarContentDirective],
            imports: [CommonModule, DropdownModule, FlexLayoutModule]
        })
    ], ToolbarModule);
    return ToolbarModule;
}());
export { ToolbarModule };
//# sourceMappingURL=toolbar.module.js.map