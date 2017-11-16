var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter, Output, ContentChild, ViewEncapsulation, ContentChildren, TemplateRef, QueryList } from '@angular/core';
import { TreeNodeComponent } from './tree-node.component';
var TreeComponent = /** @class */ (function () {
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
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TreeComponent.prototype, "nodes", void 0);
    __decorate([
        Input(),
        ContentChild(TemplateRef),
        __metadata("design:type", TemplateRef)
    ], TreeComponent.prototype, "template", void 0);
    __decorate([
        ContentChildren(TreeNodeComponent),
        __metadata("design:type", QueryList)
    ], TreeComponent.prototype, "nodeElms", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "expand", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "collapse", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "deactivate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "select", void 0);
    TreeComponent = __decorate([
        Component({
            selector: 'ngx-tree',
            template: "\n    <div class=\"ngx-tree\" [class.one-leaf]=\"hasOneLeaf\">\n      <ul class=\"vertical-list\">\n        <ngx-tree-node \n          *ngFor=\"let node of nodes\"\n          [expandable]=\"node.expandable\"\n          [expanded]=\"node.expanded\"\n          [label]=\"node.label\"\n          [model]=\"node.model\"\n          [children]=\"node.children\"\n          [template]=\"template\"\n          (expand)=\"expand.emit($event)\"\n          (collapse)=\"collapse.emit($event)\"\n          (activate)=\"activate.emit($event)\" \n          (deactivate)=\"deactivate.emit($event)\"\n          (select)=\"select.emit($event)\">\n        </ngx-tree-node>\n        <ng-content *ngIf=\"!nodes\"></ng-content>\n      </ul>\n      <div \n        class=\"ngx-tree-vr\" \n        *ngIf=\"nodes?.length || nodeElms?.length\">\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./tree.component.css']
        })
    ], TreeComponent);
    return TreeComponent;
}());
export { TreeComponent };
//# sourceMappingURL=tree.component.js.map