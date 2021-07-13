import {
  ChangeDetectorRef,
  InjectionToken,
  Optional,
  Provider,
} from '@angular/core';
import { DestroyedService } from '@swimlane/ngx-ui/common';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SizeControllerDirective } from './size.controller';

// TODO: switch to createControllerProviderFactory for Ivy
// export const [NGX_SIZE_WATCHED_CONTROLLER, NGX_SIZE_CONTROLLER_PROVIDER] =
//   createControllerProviderFactory({
//     controller: SizeControllerDirective,
//     watchedControllerTokenName: 'Watched ngxSize Controller',
//     newInstanceOnNull: true,
//   });

export const NGX_SIZE_WATCHED_CONTROLLER = new InjectionToken(
  'Watched ngxSize Controller'
);

export const NGX_SIZE_CONTROLLER_PROVIDER: Provider[] = [
  DestroyedService,
  {
    provide: NGX_SIZE_WATCHED_CONTROLLER,
    deps: [
      [new Optional(), SizeControllerDirective],
      ChangeDetectorRef,
      DestroyedService,
    ],
    useFactory: sizeControllerFactory,
  },
];

export function sizeControllerFactory(
  controller: SizeControllerDirective | null,
  changeDetectorRef: ChangeDetectorRef,
  destroyed: Observable<void>
) {
  if (!controller) {
    return new SizeControllerDirective();
  }

  controller.changes$.pipe(takeUntil(destroyed)).subscribe(() => {
    changeDetectorRef.markForCheck();
  });

  return controller;
}
