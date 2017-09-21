import { Directive, TemplateRef } from '@angular/core';
var IfTabActiveDirective = /** @class */ (function () {
    function IfTabActiveDirective(templateRef) {
        this.templateRef = templateRef;
    }
    IfTabActiveDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngxIfTabActive]'
                },] },
    ];
    /** @nocollapse */
    IfTabActiveDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return IfTabActiveDirective;
}());
export { IfTabActiveDirective };
//# sourceMappingURL=if-tab-active.directive.js.map