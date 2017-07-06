import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '../overlay';
import { InjectionService } from '../../services';
import { DrawerComponent } from './drawer.component';
import { DrawerService } from './drawer.service';
var DrawerModule = (function () {
    function DrawerModule() {
    }
    DrawerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DrawerComponent],
                    exports: [DrawerComponent],
                    providers: [DrawerService, InjectionService],
                    imports: [CommonModule, OverlayModule],
                    entryComponents: [DrawerComponent]
                },] },
    ];
    /** @nocollapse */
    DrawerModule.ctorParameters = function () { return []; };
    return DrawerModule;
}());
export { DrawerModule };
//# sourceMappingURL=drawer.module.js.map