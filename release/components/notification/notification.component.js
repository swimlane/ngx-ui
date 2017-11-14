import { Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewEncapsulation } from '@angular/core';
import { NotificationService } from './notification.service';
import { NotificationType } from './notification.type';
import { NotificationStyleType } from './notification-style.type';
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(notificationService) {
        this.notificationService = notificationService;
    }
    Object.defineProperty(NotificationComponent.prototype, "cssClasses", {
        get: function () {
            var cls = "ngx-notification ngx-notification-" + this.styleType;
            if (this.cssClass)
                cls += " " + this.cssClass;
            if (this.showClose)
                cls += ' notification-closeable';
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    NotificationComponent.prototype.onMouseEnter = function () {
        if (this.pauseOnHover) {
            this.pause.emit();
        }
    };
    NotificationComponent.prototype.onMouseLeave = function () {
        if (this.pauseOnHover) {
            this.resume.emit();
        }
    };
    return NotificationComponent;
}());
export { NotificationComponent };
//# sourceMappingURL=notification.component.js.map