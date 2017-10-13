import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon';
import { ToolbarModule } from '../toolbar';
import { NagComponent } from './nag.component';
var NagModule = /** @class */ (function () {
    function NagModule() {
    }
    NagModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NagComponent],
                    exports: [NagComponent],
                    imports: [CommonModule, ToolbarModule, IconModule],
                    entryComponents: [NagComponent]
                },] },
    ];
    /** @nocollapse */
    NagModule.ctorParameters = function () { return []; };
    return NagModule;
}());
export { NagModule };
//# sourceMappingURL=nag.module.js.map