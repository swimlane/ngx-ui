import { Directive, TemplateRef } from '@angular/core';
var SelectOptionInputTemplateDirective = (function () {
    function SelectOptionInputTemplateDirective(template) {
        this.template = template;
    }
    return SelectOptionInputTemplateDirective;
}());
export { SelectOptionInputTemplateDirective };
SelectOptionInputTemplateDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngx-select-option-input-template]' },] },
];
/** @nocollapse */
SelectOptionInputTemplateDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
//# sourceMappingURL=select-option-input-template.directive.js.map