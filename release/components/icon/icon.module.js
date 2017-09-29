import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IconComponent } from './icon.component';
var IconModule = /** @class */ (function () {
    function IconModule() {
    }
    IconModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [IconComponent],
                    exports: [IconComponent],
                    imports: [CommonModule, HttpClientModule]
                },] },
    ];
    /** @nocollapse */
    IconModule.ctorParameters = function () { return []; };
    return IconModule;
}());
export { IconModule };
//# sourceMappingURL=icon.module.js.map