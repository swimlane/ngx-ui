var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TabComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TabComponent.prototype, "active", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TabComponent.prototype, "disabled", void 0);
    __decorate([
        ContentChild(IfTabActiveDirective),
        __metadata("design:type", IfTabActiveDirective)
    ], TabComponent.prototype, "template", void 0);
    TabComponent = __decorate([
        Component({
            selector: 'ngx-tab',
            template: "\n    <div *ngIf=\"template; then template_container else content_container\"></div>\n    <ng-template #template_container>\n      <div *ngIf=\"active\">\n        <ng-container [ngTemplateOutlet]=\"template.templateRef\"></ng-container>\n      </div>\n    </ng-template>\n    <ng-template #content_container>\n      <div [hidden]=\"!active\">\n        <ng-content></ng-content>\n      </div>\n    </ng-template>\n  ",
            host: {
                class: 'ngx-tab'
            }
        })
    ], TabComponent);
    return TabComponent;
}());
export { TabComponent };
//# sourceMappingURL=tab.component.js.map