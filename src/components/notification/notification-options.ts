import { NotificationType } from './notification.type';
import { NotificationStyleType } from './notification-style.type';

export interface NotificationOptions {

  timeout?: number|boolean;
  rateLimit?: boolean;
  type?: NotificationType;
  styleType?: NotificationStyleType;
  body?: string;
  title?: string;
  icon?: any;

  // internal
  id?: string;
  timer?: any;
  timestamp?: any;

  // only html
  template?: any;
  showClose?: boolean;
  pauseOnHover?: boolean;

  // only native
  sound?: boolean;
  
}
