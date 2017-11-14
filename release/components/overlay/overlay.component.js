import { Component, ViewEncapsulation, Directive, Input, Output, EventEmitter, trigger, transition, animate, style, state } from '@angular/core';
/**
 * Overlay Component for Drawer/Dialogs
 */
var /**
 * Overlay Component for Drawer/Dialogs
 */
OverlayComponent = /** @class */ (function () {
    function OverlayComponent() {
    }
    Object.defineProperty(OverlayComponent.prototype, "animationState", {
        get: function () {
            return this.visible ? 'active' : 'inactive';
        },
        enumerable: true,
        configurable: true
    });
    return OverlayComponent;
}());
/**
 * Overlay Component for Drawer/Dialogs
 */
export { OverlayComponent };
//# sourceMappingURL=overlay.component.js.map