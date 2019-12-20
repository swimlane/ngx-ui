import { TemplateRef } from '@angular/core';
import { PartialBindings } from '@swimlane/ngx-ui/services';

import { AlertTypes } from './alert';

export interface DialogOptions extends PartialBindings {
  readonly title?: string;
  readonly content?: string;
  readonly template?: TemplateRef<any>;
  readonly cssClass?: string;
  readonly context?: any;
  readonly class?: string;
  readonly closeOnBlur?: boolean;
  readonly closeOnEscape?: boolean;
  readonly closeButton?: boolean;
  readonly visible?: boolean;
  readonly longPress?: boolean;
  readonly zIndex?: number;
  readonly type?: AlertTypes;
  readonly inputs?: {
    title?: string;
    content?: string;
    template?: TemplateRef<any>;
    cssClass?: string;
    context?: any;
    class?: string;
    closeOnBlur?: boolean;
    closeOnEscape?: boolean;
    closeButton?: boolean;
    visible?: boolean;
    longPress?: boolean;
    zIndex?: number;
    type?: AlertTypes;
  };
}
