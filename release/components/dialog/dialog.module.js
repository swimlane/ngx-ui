import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InjectionService } from '../../services';
import { OverlayModule } from '../overlay';
import { InputModule } from '../input';
import { AlertComponent, AlertService } from './alert';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';
var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DialogComponent, AlertComponent],
                    exports: [DialogComponent, AlertComponent],
                    providers: [DialogService, AlertService, InjectionService],
                    imports: [CommonModule, OverlayModule, InputModule, FormsModule],
                    entryComponents: [DialogComponent, AlertComponent]
                },] },
    ];
    /** @nocollapse */
    DialogModule.ctorParameters = function () { return []; };
    return DialogModule;
}());
export { DialogModule };
//# sourceMappingURL=dialog.module.js.map