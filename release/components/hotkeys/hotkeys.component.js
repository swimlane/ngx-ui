import { Component, HostListener } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { HotkeysService } from './hotkeys.service';
var HotkeysComponent = (function () {
    function HotkeysComponent(hotkeysService) {
        var _this = this;
        this.hotkeysService = hotkeysService;
        this.hotkeys = [];
        this.showHotkeys = false;
        this.hotkeysService.changeEvent.subscribe(function (hotkeys) {
            _this.updateHotkeys(hotkeys);
        });
        this.updateHotkeys(this.hotkeysService.hotkeys);
    }
    HotkeysComponent.prototype.updateHotkeys = function (hotkeys) {
        this.hotkeys = [];
        for (var comb in hotkeys) {
            for (var _i = 0, _a = hotkeys[comb]; _i < _a.length; _i++) {
                var hotkey = _a[_i];
                if (hotkey.status === 'active') {
                    this.hotkeys.push(hotkey);
                }
            }
        }
    };
    HotkeysComponent.prototype.handleKeyboardEvent = function (event) {
        return this.hotkeysService.keyPress(event);
    };
    HotkeysComponent.prototype.show = function () {
        this.showHotkeys = true;
    };
    HotkeysComponent.prototype.hide = function () {
        this.showHotkeys = false;
    };
    return HotkeysComponent;
}());
export { HotkeysComponent };
HotkeysComponent.decorators = [
    { type: Component, args: [{
                selector: 'hotkeys',
                templateUrl: './hotkeys.component.html',
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
    { type: HotkeysService, },
]; };
HotkeysComponent.propDecorators = {
    'handleKeyboardEvent': [{ type: HostListener, args: ['document:keypress', ['$event'],] },],
};
//# sourceMappingURL=hotkeys.component.js.map