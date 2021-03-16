import { TemplateRef } from '@angular/core';
import type { PartialBindingsNoInput } from '@swimlane/ngx-ui/injection';
import { NotificationStyleType, NotificationType } from '../enums';

export interface NotificationOptions extends PartialBindingsNoInput {
  readonly cssClass?: string;
  readonly title?: string;
  readonly body?: string;
  readonly template?: TemplateRef<unknown>;
  readonly pauseOnHover?: boolean;
  readonly type?: NotificationType;
  readonly styleType?: NotificationStyleType;
  readonly showClose?: boolean;
  readonly timestamp?: number;
  readonly icon?: string;
  readonly timeout?: number | boolean;
  readonly rateLimit?: boolean;
  readonly sound?: boolean;
  readonly inputs?: {
    cssClass?: string;
    title?: string;
    body?: string;
    template?: TemplateRef<unknown>;
    pauseOnHover?: boolean;
    type?: NotificationType;
    styleType?: NotificationStyleType;
    showClose?: boolean;
    timestamp?: number;
    icon?: string;
    timeout?: number | boolean;
    rateLimit?: boolean;
    sound?: boolean;
  };
}
