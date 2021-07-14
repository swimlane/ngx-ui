import { TemplateRef } from '@angular/core';
import { PartialBindingsNoInput } from '@swimlane/ngx-ui/common';
import { DrawerDirection } from '../enums';

export interface DrawerOptions extends PartialBindingsNoInput {
  readonly cssClass?: string;
  readonly direction?: DrawerDirection;
  readonly template?: TemplateRef<unknown>;
  readonly context?: unknown;
  readonly size?: number;
  readonly zIndex?: number;
  readonly closeOnOutsideClick?: boolean;
  readonly isRoot?: boolean;
  readonly inputs?: {
    cssClass?: string;
    direction?: DrawerDirection;
    template?: TemplateRef<unknown>;
    context?: unknown;
    size?: number;
    zIndex?: number;
    closeOnOutsideClick?: boolean;
    isRoot?: boolean;
  };
  readonly parentContainer?: unknown;
}
