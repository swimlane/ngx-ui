import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validators } from '@angular/forms';
var MAX_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return MaxValidatorDirective; }),
    multi: true
};
var MaxValidatorDirective = (function () {
    function MaxValidatorDirective() {
    }
    MaxValidatorDirective.prototype.validate = function (c) {
        if (this.type !== 'number') {
            return null;
        }
        return Validators.max(this.max)(c);
    };
    MaxValidatorDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'input[min]',
                    providers: [MAX_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    MaxValidatorDirective.ctorParameters = function () { return []; };
    MaxValidatorDirective.propDecorators = {
        'max': [{ type: Input },],
        'type': [{ type: Input },],
    };
    return MaxValidatorDirective;
}());
export { MaxValidatorDirective };
//# sourceMappingURL=max-value.directive.js.map