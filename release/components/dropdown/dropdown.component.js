import { Component, Input, ContentChild, HostBinding, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
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
    function DropdownComponent(element, renderer) {
        this.renderer = renderer;
        this.open = false;
        this.closeOnClick = true;
        this.closeOnOutsideClick = true;
        this.trigger = 'click';
    }
    DropdownComponent.prototype.ngAfterContentInit = function () {
        this.toggleListener = this.renderer.listen(this.dropdownToggle.element, this.trigger, this.onToggleClick.bind(this));
    };
    DropdownComponent.prototype.ngOnDestroy = function () {
        if (this.toggleListener)
            this.toggleListener();
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
            }
        }
    };
    DropdownComponent.prototype.onToggleClick = function (ev) {
        if (!this.dropdownToggle.disabled) {
            this.open = !this.open;
            if (this.open) {
                this.documentListener = this.renderer.listen(document, 'click', this.onDocumentClick.bind(this));
            }
            else if (this.documentListener) {
                this.documentListener();
            }
        }
    };
    DropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-dropdown',
                    host: {
                        class: 'ngx-dropdown'
                    },
                    template: "<ng-content></ng-content>",
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./dropdown.component.css'],
                },] },
    ];
    /** @nocollapse */
    DropdownComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    DropdownComponent.propDecorators = {
        'open': [{ type: Input }, { type: HostBinding, args: ['class.open',] },],
        'closeOnClick': [{ type: Input },],
        'closeOnOutsideClick': [{ type: Input },],
        'trigger': [{ type: Input },],
        'dropdownToggle': [{ type: ContentChild, args: [DropdownToggleDirective,] },],
        'dropdownMenu': [{ type: ContentChild, args: [DropdownMenuDirective,] },],
    };
    return DropdownComponent;
}());
export { DropdownComponent };
//# sourceMappingURL=dropdown.component.js.map