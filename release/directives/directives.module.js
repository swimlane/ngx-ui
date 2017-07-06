import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DblClickCopyDirective } from './dbl-click-copy.directive';
import { VisibilityDirective } from './visibility.directive';
var DirectivesModule = (function () {
    function DirectivesModule() {
    }
    DirectivesModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [VisibilityDirective, DblClickCopyDirective],
                    exports: [VisibilityDirective, DblClickCopyDirective],
                    imports: [CommonModule]
                },] },
    ];
    /** @nocollapse */
    DirectivesModule.ctorParameters = function () { return []; };
    return DirectivesModule;
}());
export { DirectivesModule };
//# sourceMappingURL=directives.module.js.map