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
import { Injectable } from '@angular/core';
import { InjectionRegisteryService, InjectionService } from '../../services';
import { NotificationType } from './notification.type';
import { NotificationStyleType } from './notification-style.type';
import { NotificationPermissionType } from './notification-permission.type';
import { NotificationComponent } from './notification.component';
import { NotificationContainerComponent } from './notification-container.component';
var NotificationService = (function (_super) {
    __extends(NotificationService, _super);
    function NotificationService(injectionService) {
        var _this = _super.call(this, injectionService) || this;
        _this.defaults = {
            inputs: {
                timeout: 2000,
                rateLimit: true,
                pauseOnHover: true,
                type: NotificationType.html,
                styleType: NotificationStyleType.info,
                showClose: true,
                sound: false
            }
        };
        _this.type = NotificationComponent;
        return _this;
    }
    Object.defineProperty(NotificationService.prototype, "isNativeSupported", {
        get: function () {
            return 'Notification' in window;
        },
        enumerable: true,
        configurable: true
    });
    NotificationService.prototype.create = function (bindings) {
        // verify flood not happening
        if (bindings.rateLimit && this.isFlooded(bindings)) {
            return false;
        }
        // if limit reached, remove the first one
        var compsByType = this.getByType();
        if (compsByType && compsByType.length >= NotificationService.limit) {
            this.destroy(compsByType[0]);
        }
        // native notifications need to be invoked
        var component;
        if (bindings.type === NotificationType.native) {
            component = this.showNative(bindings);
        }
        else {
            component = _super.prototype.create.call(this, bindings);
            this.createSubscriptions(component);
        }
        // start timer for notification
        this.startTimer(component);
        return component;
    };
    NotificationService.prototype.startTimer = function (component) {
        var _this = this;
        if (component.instance.timeout !== false) {
            clearTimeout(component.instance.timer);
            component.instance.timer = setTimeout(function () {
                _this.destroy(component);
            }, component.instance.timeout);
        }
    };
    NotificationService.prototype.pauseTimer = function (component) {
        clearTimeout(component.instance.timer);
    };
    NotificationService.prototype.requestPermissions = function () {
        var _this = this;
        if (this.isNativeSupported) {
            Notification.requestPermission(function (status) {
                return _this.permission = status;
            });
        }
    };
    NotificationService.prototype.assignDefaults = function (bindings) {
        bindings = _super.prototype.assignDefaults.call(this, bindings);
        // add a timestamp for flood checks
        bindings.inputs.timestamp = +new Date();
        return bindings;
    };
    NotificationService.prototype.injectComponent = function (type, bindings) {
        if (!this.container) {
            this.container = this.injectionService.appendComponent(NotificationContainerComponent);
        }
        return this.injectionService.appendComponent(type, bindings, this.container);
    };
    NotificationService.prototype.createSubscriptions = function (component) {
        var _this = this;
        var pauseSub;
        var resumeSub;
        var closeSub;
        var kill = function () {
            if (closeSub)
                closeSub.unsubscribe();
            if (resumeSub)
                resumeSub.unsubscribe();
            if (pauseSub)
                pauseSub.unsubscribe();
            _this.destroy(component);
        };
        var pause = function () {
            _this.pauseTimer(component);
        };
        var resume = function () {
            _this.startTimer(component);
        };
        pauseSub = component.instance.pause.subscribe(pause);
        resumeSub = component.instance.resume.subscribe(resume);
        closeSub = component.instance.close.subscribe(kill);
    };
    NotificationService.prototype.isFlooded = function (newNotification) {
        var compsByType = this.getByType();
        for (var _i = 0, compsByType_1 = compsByType; _i < compsByType_1.length; _i++) {
            var notification = compsByType_1[_i];
            var instance = notification.instance;
            if (instance.title === newNotification.title &&
                instance.body === newNotification.body &&
                instance.timestamp + 1000 > newNotification.timestamp) {
                return true;
            }
        }
        return false;
    };
    NotificationService.prototype.showNative = function (options) {
        if (!this.isNativeSupported)
            return;
        if (!this.permission)
            this.requestPermissions();
        if (this.permission === NotificationPermissionType.denied)
            return;
        var note = new Notification(options.title, options);
        note.onerror = function () {
            console.error('Notification failed!', options);
        };
        // manually do this
        if (options && options.timeout !== false) {
            setTimeout(note.close.bind(note), options.timeout);
        }
        return note;
    };
    return NotificationService;
}(InjectionRegisteryService));
export { NotificationService };
NotificationService.limit = 10;
NotificationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NotificationService.ctorParameters = function () { return [
    { type: InjectionService, },
]; };
//# sourceMappingURL=notification.service.js.map