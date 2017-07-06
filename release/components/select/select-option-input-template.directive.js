import { Directive, TemplateRef } from '@angular/core';
var SelectOptionInputTemplateDirective = (function () {
    function SelectOptionInputTemplateDirective(template) {
        this.template = template;
    }
    SelectOptionInputTemplateDirective.decorators = [
        { type: Directive, args: [{ selector: '[ngx-select-option-input-template]' },] },
    ];
    /** @nocollapse */
    SelectOptionInputTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return SelectOptionInputTemplateDirective;
}());
export { SelectOptionInputTemplateDirective };
//# sourceMappingURL=select-option-input-template.directive.js.map