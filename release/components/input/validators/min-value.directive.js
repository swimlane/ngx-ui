var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validators } from '@angular/forms';
var MIN_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return MinValidatorDirective; }),
    multi: true
};
var MinValidatorDirective = /** @class */ (function () {
    function MinValidatorDirective() {
    }
    MinValidatorDirective.prototype.validate = function (c) {
        if (this.type !== 'number') {
            return null;
        }
        return Validators.min(this.min)(c);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MinValidatorDirective.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MinValidatorDirective.prototype, "type", void 0);
    MinValidatorDirective = __decorate([
        Directive({
            selector: 'input[min]',
            providers: [MIN_VALIDATOR],
            host: {
                '[attr.min]': 'min ? min : null',
                '[attr.type]': 'type ? type : null'
            }
        })
    ], MinValidatorDirective);
    return MinValidatorDirective;
}());
export { MinValidatorDirective };
//# sourceMappingURL=min-value.directive.js.map