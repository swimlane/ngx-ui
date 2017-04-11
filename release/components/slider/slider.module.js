import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './slider.component';
var SliderModule = (function () {
    function SliderModule() {
    }
    return SliderModule;
}());
export { SliderModule };
SliderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SliderComponent],
                exports: [SliderComponent],
                imports: [CommonModule, FormsModule]
            },] },
];
/** @nocollapse */
SliderModule.ctorParameters = function () { return []; };
//# sourceMappingURL=slider.module.js.map