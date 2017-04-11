import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownMenuDirective } from './dropdown-menu.directive';
var DropdownModule = (function () {
    function DropdownModule() {
    }
    return DropdownModule;
}());
export { DropdownModule };
DropdownModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DropdownComponent, DropdownToggleDirective, DropdownMenuDirective],
                exports: [DropdownComponent, DropdownToggleDirective, DropdownMenuDirective],
                imports: [CommonModule]
            },] },
];
/** @nocollapse */
DropdownModule.ctorParameters = function () { return []; };
//# sourceMappingURL=dropdown.module.js.map