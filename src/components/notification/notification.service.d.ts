import { ComponentRef } from '@angular/core';
import { InjectionService } from '../../utils';
import { NotificationType } from './notification.type';
import { NotificationContainerComponent } from './notification-container.component';
export declare class NotificationService {
    private injectionService;
    static defaults: {
        timeout: number;
        rateLimit: boolean;
        pauseOnHover: boolean;
        type: NotificationType;
        showClose: boolean;
    };
    notifications: any[];
    container: ComponentRef<NotificationContainerComponent>;
    constructor(injectionService: InjectionService);
    show(options: any): any;
    destroy(id: any): void;
    destroyAll(): void;
    pauseTimer(id: any): void;
    startTimer(id: any): void;
    private injectComponent();
    private isFlooded(newNotification);
    private transposeDefaults(options);
    private requestPermission();
}
