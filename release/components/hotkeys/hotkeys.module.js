import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeysComponent } from './hotkeys.component';
import { HotkeysService } from './hotkeys.service';
export * from './hotkeys.service';
export * from './hotkeys.component';
var HotkeysModule = (function () {
    function HotkeysModule() {
    }
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
    return HotkeysModule;
}());
export { HotkeysModule };
//# sourceMappingURL=hotkeys.module.js.map