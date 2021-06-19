import { inject, InjectionToken } from '@angular/core';
import { NGX_UI_WINDOW } from '@swimlane/ngx-ui/common';

export const INTERSECTION_OBSERVER_SUPPORT = new InjectionToken<boolean>(
  'Intersection Observer API support',
  {
    providedIn: 'root',
    factory: () => {
      const w = inject(NGX_UI_WINDOW);
      return 'IntersectionObserver' in w && w['IntersectionObserver'] != null;
    },
  }
);
