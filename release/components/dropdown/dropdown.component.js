import { Component, Input, ContentChild, HostBinding, OnDestroy, AfterContentInit, HostListener, ElementRef, Renderer2, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
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
var /**
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
DropdownComponent = /** @class */ (function () {
    function DropdownComponent(renderer, cd) {
        this.renderer = renderer;
        this.cd = cd;
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
    return DropdownComponent;
}());
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
export { DropdownComponent };
//# sourceMappingURL=dropdown.component.js.map