var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { SelectInputComponent } from './select-input.component';
import { SelectDropdownComponent } from './select-dropdown.component';
import { SelectOptionDirective } from './select-option.directive';
import { SelectOptionTemplateDirective } from './select-option-template.directive';
import { SelectOptionInputTemplateDirective } from './select-option-input-template.directive';
var SelectModule = /** @class */ (function () {
    function SelectModule() {
    }
    SelectModule = __decorate([
        NgModule({
            declarations: [
                SelectComponent,
                SelectInputComponent,
                SelectOptionDirective,
                SelectOptionTemplateDirective,
                SelectDropdownComponent,
                SelectOptionInputTemplateDirective
            ],
            exports: [
                SelectComponent,
                SelectOptionDirective,
                SelectOptionTemplateDirective,
                SelectOptionInputTemplateDirective
            ],
            imports: [CommonModule]
        })
    ], SelectModule);
    return SelectModule;
}());
export { SelectModule };
//# sourceMappingURL=select.module.js.map