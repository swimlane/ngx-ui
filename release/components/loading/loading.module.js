import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InjectionService } from '../../services';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';
var LoadingModule = (function () {
    function LoadingModule() {
    }
    return LoadingModule;
}());
export { LoadingModule };
LoadingModule.decorators = [
    { type: NgModule, args: [{
                declarations: [LoadingComponent],
                providers: [LoadingService, InjectionService],
                exports: [LoadingComponent],
                imports: [CommonModule],
                entryComponents: [LoadingComponent]
            },] },
];
/** @nocollapse */
LoadingModule.ctorParameters = function () { return []; };
//# sourceMappingURL=loading.module.js.map