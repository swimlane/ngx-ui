import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InjectionService } from '../../services';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { NotificationContainerComponent } from './notification-container.component';
var NotificationModule = (function () {
    function NotificationModule() {
    }
    return NotificationModule;
}());
export { NotificationModule };
NotificationModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NotificationComponent, NotificationContainerComponent],
                exports: [NotificationComponent, NotificationContainerComponent],
                providers: [NotificationService, InjectionService],
                imports: [CommonModule],
                entryComponents: [NotificationComponent, NotificationContainerComponent]
            },] },
];
/** @nocollapse */
NotificationModule.ctorParameters = function () { return []; };
//# sourceMappingURL=notification.module.js.map