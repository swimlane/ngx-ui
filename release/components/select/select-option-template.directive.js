import { Directive, TemplateRef } from '@angular/core';
var SelectOptionTemplateDirective = (function () {
    function SelectOptionTemplateDirective(template) {
        this.template = template;
    }
    return SelectOptionTemplateDirective;
}());
export { SelectOptionTemplateDirective };
SelectOptionTemplateDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngx-select-option-template]' },] },
];
/** @nocollapse */
SelectOptionTemplateDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
//# sourceMappingURL=select-option-template.directive.js.map