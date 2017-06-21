import { EventEmitter } from '@angular/core';
import { NotificationService } from './notification.service';
import { NotificationStyleType } from './notification-style.type';
export declare class NotificationComponent {
    private notificationService;
    cssClass: string;
    title: string;
    body: string;
    template: any;
    pauseOnHover: boolean;
    styleType: NotificationStyleType;
    showClose: boolean;
    timestamp: any;
    icon: string;
    close: EventEmitter<{}>;
    pause: EventEmitter<{}>;
    resume: EventEmitter<{}>;
    timeout: any;
    readonly cssClasses: string;
    constructor(notificationService: NotificationService);
    onMouseEnter(): void;
    onMouseLeave(): void;
}
