var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, TemplateRef, ContentChild } from '@angular/core';
import { SelectOptionTemplateDirective } from './select-option-template.directive';
import { SelectOptionInputTemplateDirective } from './select-option-input-template.directive';
var SelectOptionDirective = /** @class */ (function () {
    function SelectOptionDirective() {
        this.name = '';
        this.disabled = false;
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectOptionDirective.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectOptionDirective.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectOptionDirective.prototype, "disabled", void 0);
    __decorate([
        Input(),
        ContentChild(SelectOptionTemplateDirective, { read: TemplateRef }),
        __metadata("design:type", TemplateRef)
    ], SelectOptionDirective.prototype, "optionTemplate", void 0);
    __decorate([
        Input(),
        ContentChild(SelectOptionInputTemplateDirective, { read: TemplateRef }),
        __metadata("design:type", TemplateRef)
    ], SelectOptionDirective.prototype, "inputTemplate", void 0);
    SelectOptionDirective = __decorate([
        Directive({
            selector: 'ngx-select-option'
        })
    ], SelectOptionDirective);
    return SelectOptionDirective;
}());
export { SelectOptionDirective };
//# sourceMappingURL=select-option.directive.js.map