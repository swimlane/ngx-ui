import { Directive, TemplateRef } from '@angular/core';
var SelectOptionTemplateDirective = (function () {
    function SelectOptionTemplateDirective(template) {
        this.template = template;
    }
    SelectOptionTemplateDirective.decorators = [
        { type: Directive, args: [{ selector: '[ngx-select-option-template]' },] },
    ];
    /** @nocollapse */
    SelectOptionTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return SelectOptionTemplateDirective;
}());
export { SelectOptionTemplateDirective };
//# sourceMappingURL=select-option-template.directive.js.map