import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
var CheckboxModule = (function () {
    function CheckboxModule() {
    }
    CheckboxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [CheckboxComponent],
                    exports: [CheckboxComponent],
                    imports: [CommonModule, FormsModule]
                },] },
    ];
    /** @nocollapse */
    CheckboxModule.ctorParameters = function () { return []; };
    return CheckboxModule;
}());
export { CheckboxModule };
//# sourceMappingURL=checkbox.module.js.map