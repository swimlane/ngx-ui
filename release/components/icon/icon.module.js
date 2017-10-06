import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { IconComponent } from './icon.component';
var IconModule = /** @class */ (function () {
    function IconModule() {
    }
    IconModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [IconComponent],
                    exports: [IconComponent],
                    imports: [CommonModule, HttpModule]
                },] },
    ];
    /** @nocollapse */
    IconModule.ctorParameters = function () { return []; };
    return IconModule;
}());
export { IconModule };
//# sourceMappingURL=icon.module.js.map