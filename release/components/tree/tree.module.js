import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeComponent } from './tree.component';
import { TreeNodeComponent } from './tree-node.component';
var TreeModule = (function () {
    function TreeModule() {
    }
    TreeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [TreeComponent, TreeNodeComponent],
                    exports: [TreeComponent, TreeNodeComponent],
                    imports: [CommonModule, FormsModule]
                },] },
    ];
    /** @nocollapse */
    TreeModule.ctorParameters = function () { return []; };
    return TreeModule;
}());
export { TreeModule };
//# sourceMappingURL=tree.module.js.map