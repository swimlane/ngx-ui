import { Component, ViewEncapsulation, Input, Output, EventEmitter, trigger, transition, animate, style, state } from '@angular/core';
/**
 * Overlay Component for Drawer/Dialogs
 */
var OverlayComponent = (function () {
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
    OverlayComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-overlay',
                    template: "\n    <div\n      (click)=\"click.emit(true)\"\n      [style.zIndex]=\"zIndex\"\n      [@overlayTransition]=\"animationState\"\n      class=\"ngx-overlay\">\n      <ng-content></ng-content>\n    </div>\n  ",
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./overlay.component.scss'],
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
                },] },
    ];
    /** @nocollapse */
    OverlayComponent.ctorParameters = function () { return []; };
    OverlayComponent.propDecorators = {
        'visible': [{ type: Input },],
        'zIndex': [{ type: Input },],
        'click': [{ type: Output },],
    };
    return OverlayComponent;
}());
export { OverlayComponent };
//# sourceMappingURL=overlay.component.js.map