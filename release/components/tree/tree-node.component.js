import { Component, Input, EventEmitter, Output, OnChanges, ViewEncapsulation, TemplateRef, ContentChild } from '@angular/core';
var TreeNodeComponent = /** @class */ (function () {
    function TreeNodeComponent() {
    }
    TreeNodeComponent.prototype.ngOnChanges = function () {
        this.data = {
            label: this.label,
            children: this.children,
            model: this.model
        };
    };
    TreeNodeComponent.prototype.onExpandClick = function () {
        if (this.disabled)
            return;
        this.expanded = !this.expanded;
        if (this.expanded) {
            this.expand.emit(this.data);
        }
        else if (!this.expand) {
            this.collapse.emit(this.data);
        }
    };
    TreeNodeComponent.prototype.onClick = function () {
        if (!this.selectable || this.disabled)
            return;
        this.select.emit(this.data);
    };
    return TreeNodeComponent;
}());
export { TreeNodeComponent };
//# sourceMappingURL=tree-node.component.js.map