import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { OverlayService } from './overlay.service';
import { InjectionService } from '../../services';
var OverlayModule = (function () {
    function OverlayModule() {
    }
    return OverlayModule;
}());
export { OverlayModule };
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
//# sourceMappingURL=overlay.module.js.map