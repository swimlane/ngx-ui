var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter, Output, TemplateRef } from '@angular/core';
var TreeNodeComponent = /** @class */ (function () {
    function TreeNodeComponent() {
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.select = new EventEmitter();
        this.expand = new EventEmitter();
        this.collapse = new EventEmitter();
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TreeNodeComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeNodeComponent.prototype, "model", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TreeNodeComponent.prototype, "children", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeNodeComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeNodeComponent.prototype, "expandable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeNodeComponent.prototype, "expanded", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeNodeComponent.prototype, "selectable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], TreeNodeComponent.prototype, "template", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeNodeComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeNodeComponent.prototype, "deactivate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeNodeComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeNodeComponent.prototype, "expand", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeNodeComponent.prototype, "collapse", void 0);
    TreeNodeComponent = __decorate([
        Component({
            selector: 'ngx-tree-node',
            template: "\n    <li\n      class=\"ngx-tree-node\"\n      [class.selectable]=\"selectable\"\n      (click)=\"onClick()\"\n      (focus)=\"activate.emit(this.data)\"\n      (blur)=\"deactivate.emit(this.data)\"\n      tabindex=\"-1\">\n      <span\n        *ngIf=\"expandable\"\n        class=\"ngx-expander\"\n        (click)=\"onExpandClick()\"\n        [ngClass]=\"{\n          'icon-tree-collapse': expanded,\n          'icon-tree-expand': !expanded,\n          'disabled': disabled\n        }\">\n      </span>\n      <span\n        *ngIf=\"!template\"\n        [innerHTML]=\"label\"\n        [class.disabled]=\"disabled\"\n        class=\"ngx-node-label\">\n      </span>\n      <ng-template\n        *ngIf=\"template\"\n        [ngTemplateOutlet]=\"template\"\n        [ngTemplateOutletContext]=\"data\">\n      </ng-template>\n      <ng-content *ngIf=\"expanded\"></ng-content>\n      <ngx-tree\n        *ngIf=\"children?.length && expandable && expanded\"\n        class=\"ngx-sub-tree\"\n        [nodes]=\"children\"\n        [template]=\"template\">\n      </ngx-tree>\n    </li>\n  "
        })
    ], TreeNodeComponent);
    return TreeNodeComponent;
}());
export { TreeNodeComponent };
//# sourceMappingURL=tree-node.component.js.map