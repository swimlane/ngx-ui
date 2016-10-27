import { NotificationService } from './notification.service';
import { NotificationType } from './notification.type';
import './notification.scss';
export declare class NotificationComponent {
    private notificationService;
    id: string;
    cssClass: string;
    title: string;
    content: string;
    template: any;
    pauseOnHover: boolean;
    type: NotificationType;
    showClose: boolean;
    readonly cssClasses: string;
    constructor(notificationService: NotificationService);
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClose(): void;
}
