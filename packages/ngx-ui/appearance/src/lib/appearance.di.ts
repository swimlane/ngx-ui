import {
  ChangeDetectorRef,
  InjectionToken,
  Optional,
  Provider,
} from '@angular/core';
import { DestroyedService } from '@swimlane/ngx-ui/common';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppearanceControllerDirective } from './appearance.controller';

// TODO: switch to createControllerProviderFactory for Ivy
// export const [
//   NGX_APPEARANCE_WATCHED_CONTROLLER,
//   NGX_APPEARANCE_CONTROLLER_PROVIDER,
// ] = createControllerProviderFactory({
//   watchedControllerTokenName: 'Watched ngxAppearance Controller',
//   controller: AppearanceControllerDirective,
//   newInstanceOnNull: true,
// });

export const NGX_APPEARANCE_WATCHED_CONTROLLER = new InjectionToken(
  'Watched ngxAppearance Controller'
);

export const NGX_APPEARANCE_CONTROLLER_PROVIDER: Provider[] = [
  DestroyedService,
  {
    provide: NGX_APPEARANCE_WATCHED_CONTROLLER,
    deps: [
      [new Optional(), AppearanceControllerDirective],
      ChangeDetectorRef,
      DestroyedService,
    ],
    useFactory: appearanceControllerFactory,
  },
];

export function appearanceControllerFactory(
  controller: AppearanceControllerDirective | null,
  changeDetectorRef: ChangeDetectorRef,
  destroyed: Observable<void>
) {
  if (!controller) {
    return new AppearanceControllerDirective();
  }

  controller.changes$.pipe(takeUntil(destroyed)).subscribe(() => {
    changeDetectorRef.markForCheck();
  });

  return controller;
}
