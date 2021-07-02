import { inject, InjectionToken } from '@angular/core';
import { NGX_UI_WINDOW } from '@swimlane/ngx-ui/common';

export const RESIZE_OBSERVER_SUPPORT = new InjectionToken<boolean>(
  'Resize Observer API support',
  {
    providedIn: 'root',
    factory: () => {
      const w = inject(NGX_UI_WINDOW);
      return (
        'ResizeObserver' in w &&
        (w as unknown as Record<string, unknown>)['ResizeObserver'] != null
      );
    },
  }
);
