import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, Validators, ValidationErrors } from '@angular/forms';
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
    return MinValidatorDirective;
}());
export { MinValidatorDirective };
//# sourceMappingURL=min-value.directive.js.map