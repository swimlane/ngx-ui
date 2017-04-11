import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section.component';
import { SectionHeaderComponent } from './section-header.component';
var SectionModule = (function () {
    function SectionModule() {
    }
    return SectionModule;
}());
export { SectionModule };
SectionModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SectionComponent, SectionHeaderComponent],
                exports: [SectionComponent, SectionHeaderComponent],
                imports: [CommonModule]
            },] },
];
/** @nocollapse */
SectionModule.ctorParameters = function () { return []; };
//# sourceMappingURL=section.module.js.map