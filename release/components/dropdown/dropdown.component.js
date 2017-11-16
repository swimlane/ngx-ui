var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ContentChild, HostBinding, Renderer2, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
/**
 * Dropdown control
 *
 *  <ngx-dropdown>
 *    <ngx-dropdown-toggle>Button</dropdown-toggle>
 *    <ngx-dropdown-menu class="pull-right">
 *      <ul><li><a>...</a></li></ul>
 *    </ngx-dropdown-menu>
 *  </ngx-dropdown>
 *
 */
var DropdownComponent = /** @class */ (function () {
    function DropdownComponent(renderer, cd) {
        this.renderer = renderer;
        this.cd = cd;
        this.open = false;
        this.showCaret = false;
        this.closeOnClick = true;
        this.closeOnOutsideClick = true;
        this.trigger = 'click';
    }
    DropdownComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.dropdownToggle.toggle.subscribe(function (ev) { return _this.onToggleClick(ev); });
    };
    DropdownComponent.prototype.ngOnDestroy = function () {
        if (this.documentListener)
            this.documentListener();
    };
    DropdownComponent.prototype.onDocumentClick = function (_a) {
        var target = _a.target;
        if (this.open && this.closeOnOutsideClick) {
            var isToggling = this.dropdownToggle.element.contains(target);
            var isMenuClick = !this.closeOnClick && this.dropdownMenu.element.contains(target);
            if (!isToggling && !isMenuClick) {
                this.open = false;
                if (this.documentListener)
                    this.documentListener();
                this.cd.markForCheck();
            }
        }
    };
    DropdownComponent.prototype.onToggleClick = function (ev) {
        var _this = this;
        if (!this.dropdownToggle.disabled) {
            this.open = !this.open;
            if (this.open) {
                this.documentListener = this.renderer.listen(document, 'click', function ($event) { return _this.onDocumentClick($event); });
            }
            else if (this.documentListener) {
                this.documentListener();
            }
        }
    };
    __decorate([
        Input(),
        HostBinding('class.open'),
        __metadata("design:type", Boolean)
    ], DropdownComponent.prototype, "open", void 0);
    __decorate([
        Input(),
        HostBinding('class.has-caret'),
        __metadata("design:type", Boolean)
    ], DropdownComponent.prototype, "showCaret", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DropdownComponent.prototype, "closeOnClick", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DropdownComponent.prototype, "closeOnOutsideClick", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DropdownComponent.prototype, "trigger", void 0);
    __decorate([
        ContentChild(DropdownToggleDirective),
        __metadata("design:type", DropdownToggleDirective)
    ], DropdownComponent.prototype, "dropdownToggle", void 0);
    __decorate([
        ContentChild(DropdownMenuDirective),
        __metadata("design:type", DropdownMenuDirective)
    ], DropdownComponent.prototype, "dropdownMenu", void 0);
    DropdownComponent = __decorate([
        Component({
            selector: 'ngx-dropdown',
            host: {
                class: 'ngx-dropdown'
            },
            template: "<ng-content></ng-content>",
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./dropdown.component.css'],
        }),
        __metadata("design:paramtypes", [Renderer2, ChangeDetectorRef])
    ], DropdownComponent);
    return DropdownComponent;
}());
export { DropdownComponent };
//# sourceMappingURL=dropdown.component.js.map