import { Component, ElementRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { HotkeysService } from './hotkeys.service';
var HotkeysComponent = (function () {
    function HotkeysComponent(elementRef, hotkeysService) {
        this.elementRef = elementRef;
        this.hotkeysService = hotkeysService;
        this.hotkeys = [];
        this.visible = false;
    }
    HotkeysComponent.prototype.ngOnInit = function () {
        this.listener = this.hotkeysService.changeEvent.subscribe(this.updateHotkeys.bind(this));
        this.updateHotkeys(this.hotkeysService.hotkeys);
    };
    HotkeysComponent.prototype.ngOnDestroy = function () {
        this.listener.unsubscribe();
    };
    HotkeysComponent.prototype.updateHotkeys = function (hotkeys) {
        this.hotkeys = [];
        for (var comb in hotkeys) {
            for (var _i = 0, _a = hotkeys[comb]; _i < _a.length; _i++) {
                var hotkey = _a[_i];
                if (hotkey.status === 'active' && hotkey.visible) {
                    this.hotkeys.push(hotkey);
                }
            }
        }
    };
    HotkeysComponent.prototype.show = function () {
        this.visible = true;
    };
    HotkeysComponent.prototype.hide = function () {
        this.visible = false;
    };
    HotkeysComponent.decorators = [
        { type: Component, args: [{
                    selector: 'hotkeys',
                    template: "\n    <div class=\"hotkeys-container\" *ngIf=\"hotkeys.length > 0\">\n      <div class=\"hotkeys\" *ngIf=\"visible\" [@containerAnimationState]=\"'active'\">\n        <div *ngFor=\"let hotkey of hotkeys\" class=\"hotkey-row\">\n            {{hotkey.description}}\n            <div class=\"combination\">\n              <span *ngFor=\"let key of hotkey.keys; let i = index\">\n                <span class=\"key\">{{key}}</span>\n                <span *ngIf=\"i < hotkey.keys.length - 1\"> + </span>\n              </span>\n            </div>\n        </div>\n      </div>\n      <span \n        class=\"close-icon icon icon-x-filled\" \n        *ngIf=\"visible\" \n        (click)=\"hide()\" \n        [@iconAnimationState]=\"'active'\">\n      </span>\n      <span \n        class=\"hotkeys-icon icon icon-keyboard\" \n        *ngIf=\"!visible\" \n        (click)=\"show()\" \n        [@iconAnimationState]=\"'active'\">\n      </span>\n    </div>\n  ",
                    styleUrls: ['./hotkeys.component.scss'],
                    animations: [
                        trigger('containerAnimationState', [
                            transition(':enter', [
                                style({
                                    opacity: 0,
                                    transform: 'translateY(-10px)'
                                }),
                                animate(250, style({
                                    opacity: 1,
                                    transform: 'translateY(0px)'
                                }))
                            ]),
                            transition(':leave', [
                                animate(250, style({
                                    opacity: 0
                                }))
                            ])
                        ]),
                        trigger('iconAnimationState', [
                            transition(':enter', [
                                style({
                                    opacity: 0
                                }),
                                animate(250, style({
                                    opacity: 1
                                }))
                            ])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    HotkeysComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: HotkeysService, },
    ]; };
    return HotkeysComponent;
}());
export { HotkeysComponent };
//# sourceMappingURL=hotkeys.component.js.map