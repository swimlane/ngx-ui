import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { InputHintDirective } from './input-hint.directive';
import { AutosizeDirective } from './input-autosize.directive';
import { InputPrefixComponent } from './input-prefix.component';
import { InputSuffixComponent } from './input-suffix.component';
import { MinValidatorDirective } from './validators/min-value.directive';
import { MaxValidatorDirective } from './validators/max-value.directive';
var InputModule = /** @class */ (function () {
    function InputModule() {
    }
    InputModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        InputComponent,
                        InputHintDirective,
                        AutosizeDirective,
                        InputPrefixComponent,
                        InputSuffixComponent,
                        MinValidatorDirective,
                        MaxValidatorDirective
                    ],
                    exports: [
                        InputComponent,
                        InputHintDirective,
                        InputPrefixComponent,
                        InputSuffixComponent
                    ],
                    imports: [CommonModule, FormsModule]
                },] },
    ];
    /** @nocollapse */
    InputModule.ctorParameters = function () { return []; };
    return InputModule;
}());
export { InputModule };
//# sourceMappingURL=input.module.js.map