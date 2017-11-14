import { Component, Input, Output, EventEmitter, Renderer, ElementRef, HostListener, trigger, style, animate, transition, state, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
var DialogComponent = /** @class */ (function () {
    function DialogComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    Object.defineProperty(DialogComponent.prototype, "contentzIndex", {
        get: function () {
            return this.zIndex + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DialogComponent.prototype, "visibleState", {
        get: function () {
            return this.visible ? 'active' : 'inactive';
        },
        enumerable: true,
        configurable: true
    });
    DialogComponent.prototype.ngOnInit = function () {
        if (this.visible)
            this.show();
    };
    DialogComponent.prototype.show = function () {
        var _this = this;
        this.visible = true;
        setTimeout(function () {
            _this.renderer.invokeElementMethod(_this.element.nativeElement, 'focus', []);
        }, 10);
        this.open.emit();
    };
    DialogComponent.prototype.onKeyDown = function () {
        if (this.closeOnEscape)
            this.hide();
    };
    DialogComponent.prototype.hide = function () {
        this.visible = false;
        this.close.emit();
    };
    DialogComponent.prototype.onDocumentClick = function (target) {
        if (this.containsTarget(target)) {
            this.hide();
        }
    };
    DialogComponent.prototype.containsTarget = function (target) {
        return this.closeOnBlur &&
            target.classList.contains('dialog');
    };
    /**
     * On destroy callback
     *
     * @memberOf DrawerComponent
     */
    /**
       * On destroy callback
       *
       * @memberOf DrawerComponent
       */
    DialogComponent.prototype.ngOnDestroy = /**
       * On destroy callback
       *
       * @memberOf DrawerComponent
       */
    function () {
        this.close.emit(true);
    };
    return DialogComponent;
}());
export { DialogComponent };
//# sourceMappingURL=dialog.component.js.map