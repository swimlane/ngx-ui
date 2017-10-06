import { Component, Input, EventEmitter, Output } from '@angular/core';
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
    TreeNodeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-tree-node',
                    template: "\n    <li\n      class=\"ngx-tree-node\"\n      [class.selectable]=\"selectable\"\n      (click)=\"onClick()\"\n      (focus)=\"activate.emit(this.data)\"\n      (blur)=\"deactivate.emit(this.data)\"\n      tabindex=\"-1\">\n      <span\n        *ngIf=\"expandable\"\n        class=\"ngx-expander\"\n        (click)=\"onExpandClick()\"\n        [ngClass]=\"{\n          'icon-tree-collapse': expanded,\n          'icon-tree-expand': !expanded,\n          'disabled': disabled\n        }\">\n      </span>\n      <span\n        *ngIf=\"!template\"\n        [innerHTML]=\"label\"\n        [class.disabled]=\"disabled\"\n        class=\"ngx-node-label\">\n      </span>\n      <ng-template\n        *ngIf=\"template\"\n        [ngTemplateOutlet]=\"template\"\n        [ngOutletContext]=\"data\">\n      </ng-template>\n      <ng-content *ngIf=\"expanded\"></ng-content>\n      <ngx-tree\n        *ngIf=\"children?.length && expandable && expanded\"\n        class=\"ngx-sub-tree\"\n        [nodes]=\"children\"\n        [template]=\"template\">\n      </ngx-tree>\n    </li>\n  "
                },] },
    ];
    /** @nocollapse */
    TreeNodeComponent.ctorParameters = function () { return []; };
    TreeNodeComponent.propDecorators = {
        'label': [{ type: Input },],
        'model': [{ type: Input },],
        'children': [{ type: Input },],
        'disabled': [{ type: Input },],
        'expandable': [{ type: Input },],
        'expanded': [{ type: Input },],
        'selectable': [{ type: Input },],
        'template': [{ type: Input },],
        'activate': [{ type: Output },],
        'deactivate': [{ type: Output },],
        'select': [{ type: Output },],
        'expand': [{ type: Output },],
        'collapse': [{ type: Output },],
    };
    return TreeNodeComponent;
}());
export { TreeNodeComponent };
//# sourceMappingURL=tree-node.component.js.map