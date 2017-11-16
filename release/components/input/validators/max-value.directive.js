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
var MAX_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return MaxValidatorDirective; }),
    multi: true
};
var MaxValidatorDirective = /** @class */ (function () {
    function MaxValidatorDirective() {
    }
    MaxValidatorDirective.prototype.validate = function (c) {
        if (this.type !== 'number') {
            return null;
        }
        return Validators.max(this.max)(c);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MaxValidatorDirective.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MaxValidatorDirective.prototype, "type", void 0);
    MaxValidatorDirective = __decorate([
        Directive({
            selector: 'input[max]',
            providers: [MAX_VALIDATOR],
            host: {
                '[attr.max]': 'max ? max : null',
                '[attr.type]': 'type ? type : null'
            }
        })
    ], MaxValidatorDirective);
    return MaxValidatorDirective;
}());
export { MaxValidatorDirective };
//# sourceMappingURL=max-value.directive.js.map