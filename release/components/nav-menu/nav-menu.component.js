var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
var NavMenuComponent = /** @class */ (function () {
    function NavMenuComponent() {
        this.expanded = false;
    }
    __decorate([
        HostBinding('class.expanded'),
        Input(),
        __metadata("design:type", Boolean)
    ], NavMenuComponent.prototype, "expanded", void 0);
    NavMenuComponent = __decorate([
        Component({
            selector: 'ngx-nav-menu',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styleUrls: ['./nav-menu.component.css'],
            template: "\n    <div class=\"nav-menu\">\n      <ng-content></ng-content>\n    </div>\n  "
        })
    ], NavMenuComponent);
    return NavMenuComponent;
}());
export { NavMenuComponent };
//# sourceMappingURL=nav-menu.component.js.map