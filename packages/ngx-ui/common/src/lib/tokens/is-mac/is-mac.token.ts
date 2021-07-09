import { inject, InjectionToken } from '@angular/core';
import { NGX_UI_WINDOW } from '../window';

export const NGX_UI_IS_MAC = new InjectionToken<boolean>(
  'A flag to determine if user agent is a Mac device',
  {
    factory: () => {
      const ngxUiWindow = inject(NGX_UI_WINDOW);
      return ngxUiIsMacFactory(ngxUiWindow);
    },
  }
);

export function ngxUiIsMacFactory(ngxUiWindow: Window) {
  if (!ngxUiWindow) return false;
  return /Mac|iPod|iPhone|iPad/.test(ngxUiWindow.navigator.platform);
}
