var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { trigger } from '@angular/animations';
import { HotkeysService } from './hotkeys.service';
import { fadeIn, slideDown } from '../../animations';
var HotkeysComponent = /** @class */ (function () {
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
    HotkeysComponent = __decorate([
        Component({
            selector: 'hotkeys',
            template: "\n    <div class=\"hotkeys-container\" *ngIf=\"hotkeys.length > 0\">\n      <div class=\"hotkeys\" *ngIf=\"visible\" [@containerAnimationState]=\"'active'\">\n        <div *ngFor=\"let hotkey of hotkeys\" class=\"hotkey-row\">\n            {{hotkey.description}}\n            <div class=\"combination\">\n              <span *ngFor=\"let key of hotkey.keys; let i = index\">\n                <span class=\"key\">{{key}}</span>\n                <span *ngIf=\"i < hotkey.keys.length - 1\"> + </span>\n              </span>\n            </div>\n        </div>\n      </div>\n      <div \n        class=\"close-icon icon icon-x-filled\" \n        *ngIf=\"visible\" \n        (click)=\"hide()\" \n        [@iconAnimationState]=\"'active'\">\n      </div>\n      <div \n        class=\"hotkeys-icon icon icon-keyboard\" \n        *ngIf=\"!visible\" \n        (click)=\"show()\" \n        [@iconAnimationState]=\"'active'\">\n      </div>\n    </div>\n  ",
            styleUrls: ['./hotkeys.component.css'],
            animations: [
                trigger('containerAnimationState', slideDown),
                trigger('iconAnimationState', fadeIn)
            ]
        }),
        __metadata("design:paramtypes", [ElementRef,
            HotkeysService])
    ], HotkeysComponent);
    return HotkeysComponent;
}());
export { HotkeysComponent };
//# sourceMappingURL=hotkeys.component.js.map