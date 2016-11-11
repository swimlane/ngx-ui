import { NotificationService } from './notification.service';
import { NotificationStyleType } from './notification-style.type';
import './notification.scss';
export declare class NotificationComponent {
    private notificationService;
    id: string;
    cssClass: string;
    title: string;
    body: string;
    template: any;
    pauseOnHover: boolean;
    styleType: NotificationStyleType;
    showClose: boolean;
    readonly cssClasses: string;
    constructor(notificationService: NotificationService);
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClose(): void;
}
