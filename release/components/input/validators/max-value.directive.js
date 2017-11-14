import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, Validators, ValidationErrors } from '@angular/forms';
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
    return MaxValidatorDirective;
}());
export { MaxValidatorDirective };
//# sourceMappingURL=max-value.directive.js.map