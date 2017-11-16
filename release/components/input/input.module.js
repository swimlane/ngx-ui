var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { InputHintDirective } from './input-hint.directive';
import { AutosizeDirective } from './input-autosize.directive';
import { InputPrefixComponent } from './input-prefix.component';
import { InputSuffixComponent } from './input-suffix.component';
import { MinValidatorDirective } from './validators/min-value.directive';
import { MaxValidatorDirective } from './validators/max-value.directive';
var InputModule = /** @class */ (function () {
    function InputModule() {
    }
    InputModule = __decorate([
        NgModule({
            declarations: [
                InputComponent,
                InputHintDirective,
                AutosizeDirective,
                InputPrefixComponent,
                InputSuffixComponent,
                MinValidatorDirective,
                MaxValidatorDirective
            ],
            exports: [
                InputComponent,
                InputHintDirective,
                InputPrefixComponent,
                InputSuffixComponent
            ],
            imports: [CommonModule, FormsModule]
        })
    ], InputModule);
    return InputModule;
}());
export { InputModule };
//# sourceMappingURL=input.module.js.map