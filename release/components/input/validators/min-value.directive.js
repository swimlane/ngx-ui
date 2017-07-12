import { Directive, Input, forwardRef, ElementRef } from '@angular/core';
import { NG_VALIDATORS, Validators } from '@angular/forms';
var MIN_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return MinValidatorDirective; }),
    multi: true
};
var MinValidatorDirective = (function () {
    function MinValidatorDirective(elm) {
        this.elm = elm;
    }
    MinValidatorDirective.prototype.ngAfterViewInit = function () {
        this.type = this.elm.nativeElement.getAttribute('type');
    };
    MinValidatorDirective.prototype.validate = function (c) {
        if (this.type !== 'number') {
            return null;
        }
        return Validators.min(this.min)(c);
    };
    MinValidatorDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'input[min]',
                    providers: [MIN_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    MinValidatorDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    MinValidatorDirective.propDecorators = {
        'min': [{ type: Input },],
    };
    return MinValidatorDirective;
}());
export { MinValidatorDirective };
//# sourceMappingURL=min-value.directive.js.map