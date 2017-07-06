import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { SelectInputComponent } from './select-input.component';
import { SelectDropdownComponent } from './select-dropdown.component';
import { SelectOptionDirective } from './select-option.directive';
import { SelectOptionTemplateDirective } from './select-option-template.directive';
import { SelectOptionInputTemplateDirective } from './select-option-input-template.directive';
var SelectModule = (function () {
    function SelectModule() {
    }
    SelectModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SelectComponent,
                        SelectInputComponent,
                        SelectOptionDirective,
                        SelectOptionTemplateDirective,
                        SelectDropdownComponent,
                        SelectOptionInputTemplateDirective
                    ],
                    exports: [
                        SelectComponent,
                        SelectOptionDirective,
                        SelectOptionTemplateDirective,
                        SelectOptionInputTemplateDirective
                    ],
                    imports: [CommonModule]
                },] },
    ];
    /** @nocollapse */
    SelectModule.ctorParameters = function () { return []; };
    return SelectModule;
}());
export { SelectModule };
//# sourceMappingURL=select.module.js.map