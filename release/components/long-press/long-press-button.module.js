import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon';
import { LongPressButtonComponent } from './long-press-button.component';
import { DirectivesModule } from '../../directives';
var LongPressButtonModule = /** @class */ (function () {
    function LongPressButtonModule() {
    }
    LongPressButtonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [LongPressButtonComponent],
                    exports: [LongPressButtonComponent],
                    imports: [CommonModule, IconModule, DirectivesModule]
                },] },
    ];
    /** @nocollapse */
    LongPressButtonModule.ctorParameters = function () { return []; };
    return LongPressButtonModule;
}());
export { LongPressButtonModule };
//# sourceMappingURL=long-press-button.module.js.map