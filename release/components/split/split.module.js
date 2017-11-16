var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SplitComponent } from './split.component';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';
var SplitModule = /** @class */ (function () {
    function SplitModule() {
    }
    SplitModule = __decorate([
        NgModule({
            declarations: [SplitComponent, SplitAreaDirective, SplitHandleComponent],
            exports: [SplitComponent, SplitAreaDirective, SplitHandleComponent],
            imports: [CommonModule, FlexLayoutModule]
        })
    ], SplitModule);
    return SplitModule;
}());
export { SplitModule };
//# sourceMappingURL=split.module.js.map