import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SplitComponent } from './split.component';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';
var SplitModule = /** @class */ (function () {
    function SplitModule() {
    }
    SplitModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SplitComponent, SplitAreaDirective, SplitHandleComponent],
                    exports: [SplitComponent, SplitAreaDirective, SplitHandleComponent],
                    imports: [CommonModule, FlexLayoutModule]
                },] },
    ];
    /** @nocollapse */
    SplitModule.ctorParameters = function () { return []; };
    return SplitModule;
}());
export { SplitModule };
//# sourceMappingURL=split.module.js.map