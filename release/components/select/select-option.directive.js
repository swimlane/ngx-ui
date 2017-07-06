import { Directive, Input, TemplateRef, ContentChild } from '@angular/core';
import { SelectOptionTemplateDirective } from './select-option-template.directive';
import { SelectOptionInputTemplateDirective } from './select-option-input-template.directive';
var SelectOptionDirective = (function () {
    function SelectOptionDirective() {
        this.name = '';
        this.disabled = false;
    }
    return SelectOptionDirective;
}());
export { SelectOptionDirective };
SelectOptionDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ngx-select-option'
            },] },
];
/** @nocollapse */
SelectOptionDirective.ctorParameters = function () { return []; };
SelectOptionDirective.propDecorators = {
    'name': [{ type: Input },],
    'value': [{ type: Input },],
    'disabled': [{ type: Input },],
    'optionTemplate': [{ type: Input }, { type: ContentChild, args: [SelectOptionTemplateDirective, { read: TemplateRef },] },],
    'inputTemplate': [{ type: Input }, { type: ContentChild, args: [SelectOptionInputTemplateDirective, { read: TemplateRef },] },],
};
//# sourceMappingURL=select-option.directive.js.map