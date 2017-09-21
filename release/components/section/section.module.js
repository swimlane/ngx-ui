import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section.component';
import { SectionHeaderComponent } from './section-header.component';
var SectionModule = /** @class */ (function () {
    function SectionModule() {
    }
    SectionModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SectionComponent, SectionHeaderComponent],
                    exports: [SectionComponent, SectionHeaderComponent],
                    imports: [CommonModule]
                },] },
    ];
    /** @nocollapse */
    SectionModule.ctorParameters = function () { return []; };
    return SectionModule;
}());
export { SectionModule };
//# sourceMappingURL=section.module.js.map