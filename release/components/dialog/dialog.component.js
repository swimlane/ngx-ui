import { Component, Input, Output, EventEmitter, Renderer, ElementRef, HostListener, trigger, style, animate, transition, state, ViewEncapsulation } from '@angular/core';
var DialogComponent = (function () {
    function DialogComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.open = new EventEmitter();
        this.close = new EventEmitter();
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
    DialogComponent.prototype.ngOnDestroy = function () {
        this.close.emit(true);
    };
    DialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-dialog',
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./dialog.component.scss'],
                    template: "\n    <div\n      class=\"ngx-dialog\"\n      [style.zIndex]=\"zIndex\">\n      <div\n        class=\"ngx-dialog-content {{cssClass}}\"\n        [@visibilityTransition]=\"visibleState\"\n        [style.zIndex]=\"contentzIndex\"\n        tabindex=\"-1\"\n        role=\"dialog\">\n        <div\n          class=\"ngx-dialog-header\"\n          *ngIf=\"title || closeButton\">\n          <button\n            *ngIf=\"closeButton\"\n            type=\"button\"\n            class=\"close\"\n            (click)=\"hide()\">\n            <span class=\"icon-x\"></span>\n          </button>\n          <h2\n            *ngIf=\"title\"\n            class=\"ngx-dialog-title\"\n            [innerHTML]=\"title\">\n          </h2>\n        </div>\n        <div class=\"ngx-dialog-body\">\n          <ng-template\n            *ngIf=\"template\"\n            [ngTemplateOutlet]=\"template\"\n            [ngOutletContext]=\"{ context: context }\">\n          </ng-template>\n          <div\n            *ngIf=\"content\"\n            [innerHTML]=\"content\">\n          </div>\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  ",
                    animations: [
                        trigger('visibilityTransition', [
                            state('active', style({
                                opacity: 1,
                                transform: 'scale3d(1, 1, 1)'
                            })),
                            transition('void => *', [
                                style({
                                    opacity: 0,
                                    transform: 'scale3d(1.2, 1.2, 1.2)'
                                }),
                                animate('0.2s ease-out')
                            ]),
                            transition('* => inactive', [
                                style({
                                    opacity: 1,
                                    transform: 'scale3d(1, 1, 1)'
                                }),
                                animate('0.2s ease-out', style({
                                    transform: 'scale3d(0.9, 0.9, 1)',
                                    opacity: 0
                                }))
                            ])
                        ])
                    ],
                    host: {
                        tabindex: '-1'
                    }
                },] },
    ];
    /** @nocollapse */
    DialogComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    DialogComponent.propDecorators = {
        'id': [{ type: Input },],
        'visible': [{ type: Input },],
        'zIndex': [{ type: Input },],
        'title': [{ type: Input },],
        'content': [{ type: Input },],
        'template': [{ type: Input },],
        'cssClass': [{ type: Input },],
        'context': [{ type: Input },],
        'closeOnBlur': [{ type: Input },],
        'closeOnEscape': [{ type: Input },],
        'closeButton': [{ type: Input },],
        'open': [{ type: Output },],
        'close': [{ type: Output },],
        'onKeyDown': [{ type: HostListener, args: ['keydown.esc',] },],
        'onDocumentClick': [{ type: HostListener, args: ['document:click', ['$event.target'],] },],
    };
    return DialogComponent;
}());
export { DialogComponent };
//# sourceMappingURL=dialog.component.js.map