var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InjectionService } from '../../services';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { NotificationContainerComponent } from './notification-container.component';
var NotificationModule = /** @class */ (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        NgModule({
            declarations: [NotificationComponent, NotificationContainerComponent],
            exports: [NotificationComponent, NotificationContainerComponent],
            providers: [NotificationService, InjectionService],
            imports: [CommonModule],
            entryComponents: [NotificationComponent, NotificationContainerComponent]
        })
    ], NotificationModule);
    return NotificationModule;
}());
export { NotificationModule };
//# sourceMappingURL=notification.module.js.map