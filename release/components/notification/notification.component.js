var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewEncapsulation } from '@angular/core';
import { NotificationService } from './notification.service';
import { NotificationStyleType } from './notification-style.type';
var NotificationComponent = /** @class */ (function () {
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "cssClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "body", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NotificationComponent.prototype, "template", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "pauseOnHover", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "styleType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "showClose", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NotificationComponent.prototype, "timestamp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "icon", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NotificationComponent.prototype, "close", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NotificationComponent.prototype, "pause", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NotificationComponent.prototype, "resume", void 0);
    __decorate([
        HostBinding('class'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], NotificationComponent.prototype, "cssClasses", null);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NotificationComponent.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NotificationComponent.prototype, "onMouseLeave", null);
    NotificationComponent = __decorate([
        Component({
            selector: 'ngx-notification',
            template: "\n    <div>\n      <div *ngIf=\"styleType !== 'none' && !icon\" class=\"icon-container\">\n        <span *ngIf=\"styleType==='info'\" class=\"icon icon-info-fulled\"></span>\n        <span *ngIf=\"styleType==='warning'\" class=\"icon icon-warning-filled\"></span>\n        <span *ngIf=\"styleType==='error'\" class=\"icon icon-x-filled\"></span>\n        <span *ngIf=\"styleType==='success'\" class=\"icon icon-check-filled\"></span>\n      </div>\n\n      <div *ngIf=\"styleType === 'none' && icon\" class=\"icon-container\">\n        <span [class]=\"'icon ' + icon\"></span>\n      </div>\n\n      <div class=\"notification-content\" [class.has-icon]=\"styleType !== 'none' || icon\">\n        <h2 class=\"ngx-notification-title\" [innerHTML]=\"title\"></h2>\n        <p class=\"ngx-notification-body\" [innerHTML]=\"body\"></p>\n        <ng-template\n          *ngIf=\"template\"\n          [ngTemplateOutlet]=\"template\"\n          [ngTemplateOutletContext]=\"notificationService\">\n        </ng-template>\n        <button\n          *ngIf=\"showClose\"\n          type=\"button\"\n          (click)=\"close.emit()\"\n          class=\"icon-x ngx-notification-close\">\n        </button>\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./notification.component.css'],
        }),
        __metadata("design:paramtypes", [NotificationService])
    ], NotificationComponent);
    return NotificationComponent;
}());
export { NotificationComponent };
//# sourceMappingURL=notification.component.js.map