import { TemplateRef } from '@angular/core';

import { NotificationStyleType } from './notification-style-type.enum';
import { NotificationType } from './notification-type.enum';

export interface NotificationOptions {
  readonly cssClass?: string;
  readonly title?: string;
  readonly body?: string;
  readonly template?: TemplateRef<any>;
  readonly pauseOnHover?: boolean;
  readonly type?: NotificationType;
  readonly styleType?: NotificationStyleType;
  readonly showClose?: boolean;
  readonly timestamp?: number;
  readonly icon?: string;
  readonly timeout?: number;
  readonly rateLimit?: boolean;
  readonly sound?: boolean;
  readonly inputs?: {
    cssClass?: string;
    title?: string;
    body?: string;
    template?: TemplateRef<any>;
    pauseOnHover?: boolean;
    type?: NotificationType;
    styleType?: NotificationStyleType;
    showClose?: boolean;
    timestamp?: number;
    icon?: string;
    timeout?: number;
    rateLimit?: boolean;
    sound?: boolean;
  };
}
