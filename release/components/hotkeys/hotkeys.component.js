import { Component, Input, HostListener, Inject, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HotkeysService } from './hotkeys.service';
import { Subscription } from 'rxjs/Subscription';
var HotkeysComponent = /** @class */ (function () {
    function HotkeysComponent(elementRef, hotkeysService) {
        this.elementRef = elementRef;
        this.hotkeysService = hotkeysService;
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
    return HotkeysComponent;
}());
export { HotkeysComponent };
//# sourceMappingURL=hotkeys.component.js.map