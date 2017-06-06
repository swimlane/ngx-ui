import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeysComponent } from './hotkeys.component';
import { HotkeysService } from './hotkeys.service';
export * from './hotkeys.service';
export * from './hotkeys.component';
var HotkeysModule = (function () {
    function HotkeysModule() {
    }
    return HotkeysModule;
}());
export { HotkeysModule };
HotkeysModule.decorators = [
    { type: NgModule, args: [{
                declarations: [HotkeysComponent],
                exports: [HotkeysComponent],
                providers: [HotkeysService],
                imports: [CommonModule]
            },] },
];
/** @nocollapse */
HotkeysModule.ctorParameters = function () { return []; };
//# sourceMappingURL=hotkeys.module.js.map