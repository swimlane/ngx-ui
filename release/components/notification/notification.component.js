import { Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewEncapsulation } from '@angular/core';
import { NotificationService } from './notification.service';
var NotificationComponent = (function () {
    function NotificationComponent(notificationService) {
        this.notificationService = notificationService;
        this.cssClass = '';
        this.close = new EventEmitter();
        this.pause = new EventEmitter();
        this.resume = new EventEmitter();
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
NotificationComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-notification',
                template: "\n    <div>\n      <div *ngIf=\"styleType !== 'none' && !icon\" class=\"icon-container\">\n        <span *ngIf=\"styleType==='info'\" class=\"icon icon-info-fulled\"></span>\n        <span *ngIf=\"styleType==='warning'\" class=\"icon icon-warning-filled\"></span>\n        <span *ngIf=\"styleType==='error'\" class=\"icon icon-x-filled\"></span>\n        <span *ngIf=\"styleType==='success'\" class=\"icon icon-check-filled\"></span>\n      </div>\n\n      <div *ngIf=\"styleType === 'none' && icon\" class=\"icon-container\">\n        <span [class]=\"'icon ' + icon\"></span>\n      </div>\n\n      <div class=\"notification-content\" [class.has-icon]=\"styleType !== 'none' || icon\">\n        <h2 class=\"ngx-notification-title\" [innerHTML]=\"title\"></h2>\n        <p class=\"ngx-notification-body\" [innerHTML]=\"body\"></p>\n        <ng-template\n          *ngIf=\"template\"\n          [ngTemplateOutlet]=\"template\"\n          [ngOutletContext]=\"notificationService\">\n        </ng-template>\n        <button\n          *ngIf=\"showClose\"\n          type=\"button\"\n          (click)=\"close.emit()\"\n          class=\"icon-x ngx-notification-close\">\n        </button>\n      </div>\n    </div>\n  ",
                encapsulation: ViewEncapsulation.None,
                styleUrls: ['./notification.component.scss'],
            },] },
];
/** @nocollapse */
NotificationComponent.ctorParameters = function () { return [
    { type: NotificationService, },
]; };
NotificationComponent.propDecorators = {
    'cssClass': [{ type: Input },],
    'title': [{ type: Input },],
    'body': [{ type: Input },],
    'template': [{ type: Input },],
    'pauseOnHover': [{ type: Input },],
    'styleType': [{ type: Input },],
    'showClose': [{ type: Input },],
    'timestamp': [{ type: Input },],
    'icon': [{ type: Input },],
    'close': [{ type: Output },],
    'pause': [{ type: Output },],
    'resume': [{ type: Output },],
    'cssClasses': [{ type: HostBinding, args: ['class',] },],
    'onMouseEnter': [{ type: HostListener, args: ['mouseenter',] },],
    'onMouseLeave': [{ type: HostListener, args: ['mouseleave',] },],
};
//# sourceMappingURL=notification.component.js.map