import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DblClickCopyDirective } from './dbl-click-copy.directive';
import { VisibilityDirective } from './visibility.directive';
import { LongPressDirective } from './long-press.directive';
var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [VisibilityDirective, DblClickCopyDirective, LongPressDirective],
                    exports: [VisibilityDirective, DblClickCopyDirective, LongPressDirective],
                    imports: [CommonModule]
                },] },
    ];
    /** @nocollapse */
    DirectivesModule.ctorParameters = function () { return []; };
    return DirectivesModule;
}());
export { DirectivesModule };
//# sourceMappingURL=directives.module.js.map