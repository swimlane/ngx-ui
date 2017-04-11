import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { InputHintDirective } from './input-hint.directive';
import { AutosizeDirective } from './input-autosize.directive';
var InputModule = (function () {
    function InputModule() {
    }
    return InputModule;
}());
export { InputModule };
InputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [InputComponent, InputHintDirective, AutosizeDirective],
                exports: [InputComponent, InputHintDirective],
                imports: [CommonModule, FormsModule]
            },] },
];
/** @nocollapse */
InputModule.ctorParameters = function () { return []; };
//# sourceMappingURL=input.module.js.map