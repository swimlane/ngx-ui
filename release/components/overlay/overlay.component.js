var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation, Input, Output, EventEmitter, trigger, transition, animate, style, state } from '@angular/core';
/**
 * Overlay Component for Drawer/Dialogs
 */
var OverlayComponent = /** @class */ (function () {
    function OverlayComponent() {
        this.visible = false;
        this.zIndex = 990;
        this.click = new EventEmitter();
    }
    Object.defineProperty(OverlayComponent.prototype, "animationState", {
        get: function () {
            return this.visible ? 'active' : 'inactive';
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], OverlayComponent.prototype, "visible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], OverlayComponent.prototype, "zIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], OverlayComponent.prototype, "click", void 0);
    OverlayComponent = __decorate([
        Component({
            selector: 'ngx-overlay',
            template: "\n    <div\n      (click)=\"click.emit(true)\"\n      [style.zIndex]=\"zIndex\"\n      [@overlayTransition]=\"animationState\"\n      class=\"ngx-overlay\">\n      <ng-content></ng-content>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./overlay.component.css'],
            animations: [
                trigger('overlayTransition', [
                    state('active', style({
                        opacity: 0.8,
                        visibility: 'visible'
                    })),
                    state('inactive', style({
                        visibility: 'hidden',
                        opacity: 0
                    })),
                    transition('* => active', [
                        animate('100ms ease-in')
                    ]),
                    transition('* => inactive', [
                        animate('100ms ease-out')
                    ]),
                    transition('* => void', [
                        style({
                            opacity: 0,
                            visibility: 'hidden',
                            'pointer-events': 'none'
                        }),
                        animate('100ms ease-out')
                    ])
                ])
            ]
        })
    ], OverlayComponent);
    return OverlayComponent;
}());
export { OverlayComponent };
//# sourceMappingURL=overlay.component.js.map