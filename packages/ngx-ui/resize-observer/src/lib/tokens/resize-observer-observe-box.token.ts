import { InjectionToken } from '@angular/core';

export const RESIZE_OPTION_BOX_DEFAULT = 'content-box';

export const RESIZE_OBSERVER_OBSERVE_BOX = new InjectionToken<
  ResizeObserverOptions['box']
>('ResizeObserver.observe#options["box"]', {
  providedIn: 'root',
  factory: () => RESIZE_OPTION_BOX_DEFAULT,
});
