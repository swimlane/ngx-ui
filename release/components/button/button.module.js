import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { FileButtonComponent } from './file-button.component';
import { ButtonComponent } from './button.component';
var ButtonModule = (function () {
    function ButtonModule() {
    }
    return ButtonModule;
}());
export { ButtonModule };
ButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [FileButtonComponent, ButtonComponent],
                exports: [FileButtonComponent, FileUploadModule, ButtonComponent],
                imports: [CommonModule, FileUploadModule]
            },] },
];
/** @nocollapse */
ButtonModule.ctorParameters = function () { return []; };
//# sourceMappingURL=button.module.js.map