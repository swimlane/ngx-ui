import { Component, Input, ContentChild } from '@angular/core';
import { IfTabActiveDirective } from './if-tab-active.directive';
/**
 * TODO: Remove hidden when https://github.com/angular/angular/issues/18310 is resolved
 */
var TabComponent = /** @class */ (function () {
    function TabComponent() {
        this.title = '';
        this.active = false;
        this.disabled = false;
    }
    TabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-tab',
                    template: "\n    <div *ngIf=\"template; then template_container else content_container\"></div>\n    <ng-template #template_container>\n      <div *ngIf=\"active\">\n        <ng-container [ngTemplateOutlet]=\"template.templateRef\"></ng-container>\n      </div>\n    </ng-template>\n    <ng-template #content_container>\n      <div [hidden]=\"!active\">\n        <ng-content></ng-content>\n      </div>\n    </ng-template>\n  ",
                    host: {
                        class: 'ngx-tab'
                    }
                },] },
    ];
    /** @nocollapse */
    TabComponent.ctorParameters = function () { return []; };
    TabComponent.propDecorators = {
        'title': [{ type: Input },],
        'active': [{ type: Input },],
        'disabled': [{ type: Input },],
        'template': [{ type: ContentChild, args: [IfTabActiveDirective,] },],
    };
    return TabComponent;
}());
export { TabComponent };
//# sourceMappingURL=tab.component.js.map