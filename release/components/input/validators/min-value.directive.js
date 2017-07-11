import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validators } from '@angular/forms';
var MIN_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return MinValidatorDirective; }),
    multi: true
};
var MinValidatorDirective = (function () {
    function MinValidatorDirective() {
    }
    MinValidatorDirective.prototype.validate = function (c) {
        if (this.type !== 'number') {
            return null;
        }
        return Validators.min(this.min)(c);
    };
    MinValidatorDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'input[min][type]',
                    providers: [MIN_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    MinValidatorDirective.ctorParameters = function () { return []; };
    MinValidatorDirective.propDecorators = {
        'min': [{ type: Input },],
        'type': [{ type: Input },],
    };
    return MinValidatorDirective;
}());
export { MinValidatorDirective };
//# sourceMappingURL=min-value.directive.js.map