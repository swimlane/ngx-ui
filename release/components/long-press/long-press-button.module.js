var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon';
import { LongPressButtonComponent } from './long-press-button.component';
import { DirectivesModule } from '../../directives';
var LongPressButtonModule = /** @class */ (function () {
    function LongPressButtonModule() {
    }
    LongPressButtonModule = __decorate([
        NgModule({
            declarations: [LongPressButtonComponent],
            exports: [LongPressButtonComponent],
            imports: [CommonModule, IconModule, DirectivesModule]
        })
    ], LongPressButtonModule);
    return LongPressButtonModule;
}());
export { LongPressButtonModule };
//# sourceMappingURL=long-press-button.module.js.map