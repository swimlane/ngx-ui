import { Component, Input, EventEmitter, Output, ContentChild, ViewEncapsulation, ContentChildren, TemplateRef, QueryList } from '@angular/core';
import { TreeNodeComponent } from './tree-node.component';
var TreeComponent = /** @class */ (function () {
    function TreeComponent() {
    }
    Object.defineProperty(TreeComponent.prototype, "hasOneLeaf", {
        get: function () {
            return (this.nodes && this.nodes.length === 1) ||
                (this.nodeElms.length === 1);
        },
        enumerable: true,
        configurable: true
    });
    return TreeComponent;
}());
export { TreeComponent };
//# sourceMappingURL=tree.component.js.map