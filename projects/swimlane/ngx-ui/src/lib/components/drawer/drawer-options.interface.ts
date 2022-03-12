import { TemplateRef } from '@angular/core';

import { DrawerDirection } from './drawer-direction.enum';

export interface DrawerOptions {
  cssClass?: string;
  direction?: DrawerDirection;
  template?: TemplateRef<any>;
  context?: any;
  size?: number;
  zIndex?: number;
  closeOnOutsideClick?: boolean;
  isRoot?: boolean;
  showOverlay?: boolean;
  fullscreenOverlay?: boolean;
  parentContainer?: any;
  inputs?: {
    cssClass?: string;
    direction?: DrawerDirection;
    template?: TemplateRef<any>;
    context?: any;
    size?: number;
    zIndex?: number;
    closeOnOutsideClick?: boolean;
    isRoot?: boolean;
  };
}
