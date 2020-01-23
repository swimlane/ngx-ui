import { TemplateRef } from '@angular/core';

import { DrawerDirection } from './drawer-direction.enum';

export interface DrawerOptions {
  readonly cssClass?: string;
  readonly direction?: DrawerDirection;
  readonly template?: TemplateRef<any>;
  readonly context?: any;
  readonly size?: number;
  readonly zIndex?: number;
  readonly closeOnOutsideClick?: boolean;
  readonly isRoot?: boolean;
  readonly inputs?: {
    cssClass?: string;
    direction?: DrawerDirection;
    template?: TemplateRef<any>;
    context?: any;
    size?: number;
    zIndex?: number;
    closeOnOutsideClick?: boolean;
    isRoot?: boolean;
  };
  readonly parentContainer?: any;
}
