import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives';
import { CodeEditorComponent } from './code-editor.component';
var CodeEditorModule = (function () {
    function CodeEditorModule() {
    }
    return CodeEditorModule;
}());
export { CodeEditorModule };
CodeEditorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CodeEditorComponent],
                exports: [CodeEditorComponent],
                imports: [CommonModule, FormsModule, DirectivesModule]
            },] },
];
/** @nocollapse */
CodeEditorModule.ctorParameters = function () { return []; };
//# sourceMappingURL=code-editor.module.js.map