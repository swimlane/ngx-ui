var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, EventEmitter } from '@angular/core';
import { InjectionService } from '../../services';
import { OverlayComponent } from './overlay.component';
var OverlayService = /** @class */ (function () {
    function OverlayService(injectionService) {
        this.injectionService = injectionService;
        // list of components that will close by clicking the overlay
        this.triggerComponents = [];
        this.click = new EventEmitter();
    }
    Object.defineProperty(OverlayService.prototype, "instance", {
        get: function () {
            if (this.component)
                return this.component.instance;
        },
        enumerable: true,
        configurable: true
    });
    OverlayService.prototype.show = function (options) {
        if (options === void 0) { options = {}; }
        if (!this.component) {
            this.component = this.injectComponent();
            this.instance.click.subscribe(this.onClick.bind(this));
        }
        this.triggerComponents.push({
            component: options.triggerComponent,
            zIndex: options.zIndex
        });
        this.component.instance.visible = true;
        this.updateZIndex();
        return this.component;
    };
    OverlayService.prototype.hide = function () {
        if (this.triggerComponents.length === 0) {
            this.component.instance.visible = false;
        }
    };
    OverlayService.prototype.destroy = function () {
        var _this = this;
        if (this.component) {
            // destroy is called like this to trigger
            // proper lifecycle events like animations
            this.hide();
            setTimeout(function () {
                if (_this.component) {
                    _this.component.destroy();
                    _this.component = undefined;
                }
            }, 100);
        }
    };
    OverlayService.prototype.injectComponent = function () {
        return this.injectionService.appendComponent(OverlayComponent);
    };
    OverlayService.prototype.onClick = function () {
        if (this.triggerComponents.length > 0) {
            var lastIdx = this.triggerComponents.length - 1;
            var triggerComponent = this.triggerComponents[lastIdx];
            this.click.emit(triggerComponent.component);
        }
    };
    OverlayService.prototype.removeTriggerComponent = function (component) {
        var idx = this.triggerComponents.findIndex(function (c) { return c.component === component; });
        if (idx !== -1) {
            this.triggerComponents.splice(idx, 1);
        }
        this.updateZIndex();
        if (this.triggerComponents.length === 0) {
            this.destroy();
        }
    };
    OverlayService.prototype.updateZIndex = function () {
        if (this.triggerComponents.length === 0) {
            return;
        }
        var indexes = this.triggerComponents.map(function (tc) { return tc.zIndex; });
        var zIndex = Math.max.apply(Math, indexes) - 1;
        this.instance.zIndex = zIndex;
    };
    OverlayService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [InjectionService])
    ], OverlayService);
    return OverlayService;
}());
export { OverlayService };
//# sourceMappingURL=overlay.service.js.map