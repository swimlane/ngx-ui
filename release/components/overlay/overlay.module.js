import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { OverlayService } from './overlay.service';
import { InjectionService } from '../../services';
var OverlayModule = /** @class */ (function () {
    function OverlayModule() {
    }
    OverlayModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [OverlayComponent],
                    providers: [OverlayService, InjectionService],
                    exports: [OverlayComponent],
                    imports: [CommonModule],
                    entryComponents: [OverlayComponent]
                },] },
    ];
    /** @nocollapse */
    OverlayModule.ctorParameters = function () { return []; };
    return OverlayModule;
}());
export { OverlayModule };
//# sourceMappingURL=overlay.module.js.map