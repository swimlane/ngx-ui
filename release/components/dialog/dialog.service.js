var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { InjectionService, InjectionRegisteryService } from '../../services';
import { OverlayService } from '../overlay';
import { DialogComponent } from './dialog.component';
var DialogService = /** @class */ (function (_super) {
    __extends(DialogService, _super);
    function DialogService(injectionService, overlayService) {
        var _this = _super.call(this, injectionService) || this;
        _this.overlayService = overlayService;
        _this.defaults = {
            inputs: {
                zIndex: 991,
                closeOnBlur: true,
                closeOnEscape: true,
                closeButton: true,
                showOverlay: true,
                visible: true
            }
        };
        _this.zIndex = 995;
        _this.type = DialogComponent;
        return _this;
    }
    DialogService.prototype.create = function (bindings) {
        var component = _super.prototype.create.call(this, bindings);
        this.createSubscriptions(component);
        return component;
    };
    DialogService.prototype.destroy = function (component) {
        var _this = this;
        var hasOverlay = component.instance.showOverlay;
        setTimeout(function () {
            if (hasOverlay) {
                _this.overlayService.removeTriggerComponent(component);
            }
            _super.prototype.destroy.call(_this, component);
            _this.zIndex = _this.zIndex - 2;
        });
    };
    DialogService.prototype.createSubscriptions = function (component) {
        var _this = this;
        var closeSub;
        var overlaySub;
        var kill = function (c) {
            if (c !== component) {
                return;
            }
            closeSub.unsubscribe();
            if (overlaySub)
                overlaySub.unsubscribe();
            _this.destroy(component);
        };
        closeSub = component.instance.close.subscribe(kill.bind(this, component));
        if (component.instance.showOverlay) {
            var overlay = this.overlayService.show({
                triggerComponent: component,
                zIndex: this.zIndex
            });
            if (component.instance.closeOnBlur) {
                overlaySub = this.overlayService.click.subscribe(kill);
            }
        }
    };
    DialogService.prototype.assignDefaults = function (bindings) {
        bindings = _super.prototype.assignDefaults.call(this, bindings);
        if (!bindings.zIndex) {
            this.zIndex = (this.overlayService.instance) ?
                this.overlayService.instance.zIndex + 3 :
                this.zIndex + 2;
            bindings.inputs.zIndex = this.zIndex;
        }
        return bindings;
    };
    DialogService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [InjectionService,
            OverlayService])
    ], DialogService);
    return DialogService;
}(InjectionRegisteryService));
export { DialogService };
//# sourceMappingURL=dialog.service.js.map