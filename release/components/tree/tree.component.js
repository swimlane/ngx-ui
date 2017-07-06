import { Component, Input, EventEmitter, Output, ContentChild, ViewEncapsulation, ContentChildren, TemplateRef } from '@angular/core';
import { TreeNodeComponent } from './tree-node.component';
var TreeComponent = (function () {
    function TreeComponent() {
        this.expand = new EventEmitter();
        this.collapse = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.select = new EventEmitter();
    }
    Object.defineProperty(TreeComponent.prototype, "hasOneLeaf", {
        get: function () {
            return (this.nodes && this.nodes.length === 1) ||
                (this.nodeElms.length === 1);
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-tree',
                    template: "\n    <div class=\"ngx-tree\" [class.one-leaf]=\"hasOneLeaf\">\n      <ul class=\"vertical-list\">\n        <ngx-tree-node \n          *ngFor=\"let node of nodes\"\n          [expandable]=\"node.expandable\"\n          [expanded]=\"node.expanded\"\n          [label]=\"node.label\"\n          [model]=\"node.model\"\n          [children]=\"node.children\"\n          [template]=\"template\"\n          (expand)=\"expand.emit($event)\"\n          (collapse)=\"collapse.emit($event)\"\n          (activate)=\"activate.emit($event)\" \n          (deactivate)=\"deactivate.emit($event)\"\n          (select)=\"select.emit($event)\">\n        </ngx-tree-node>\n        <ng-content *ngIf=\"!nodes\"></ng-content>\n      </ul>\n      <div \n        class=\"ngx-tree-vr\" \n        *ngIf=\"nodes?.length || nodeElms?.length\">\n      </div>\n    </div>\n  ",
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./tree.component.scss']
                },] },
    ];
    /** @nocollapse */
    TreeComponent.ctorParameters = function () { return []; };
    TreeComponent.propDecorators = {
        'nodes': [{ type: Input },],
        'template': [{ type: Input }, { type: ContentChild, args: [TemplateRef,] },],
        'nodeElms': [{ type: ContentChildren, args: [TreeNodeComponent,] },],
        'expand': [{ type: Output },],
        'collapse': [{ type: Output },],
        'activate': [{ type: Output },],
        'deactivate': [{ type: Output },],
        'select': [{ type: Output },],
    };
    return TreeComponent;
}());
export { TreeComponent };
//# sourceMappingURL=tree.component.js.map