import { ComponentRef } from '@angular/core';
import { InjectionService } from '../../services';
import { NotificationOptions } from './notification-options';
import { NotificationPermissionType } from './notification-permission.type';
import { NotificationContainerComponent } from './notification-container.component';
export declare class NotificationService {
    private injectionService;
    static limit: number | boolean;
    static defaults: NotificationOptions;
    permission: NotificationPermissionType;
    notifications: NotificationOptions[];
    container: ComponentRef<NotificationContainerComponent>;
    readonly isNativeSupported: boolean;
    constructor(injectionService: InjectionService);
    show(options: NotificationOptions): NotificationOptions;
    destroy(id: any): void;
    destroyAll(): void;
    pauseTimer(id: any): void;
    startTimer(id: any): void;
    requestPermissions(): void;
    private injectComponent();
    private isFlooded(newNotification);
    private transposeDefaults(options);
    private showNative(options);
}
