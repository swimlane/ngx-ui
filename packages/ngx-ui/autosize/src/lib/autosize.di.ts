import {
  ChangeDetectorRef,
  InjectionToken,
  Optional,
  Provider,
} from '@angular/core';
import { DestroyedService } from '@swimlane/ngx-ui/common';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AutosizeControllerDirective } from './autosize.controller';

// TODO: switch to createControllerProviderFactory for Ivy
// export const [
//   NGX_AUTOSIZE_WATCHED_CONTROLLER,
//   NGX_AUTOSIZE_CONTROLLER_PROVIDER,
// ] = createControllerProviderFactory({
//   controller: AutosizeControllerDirective,
//   watchedControllerTokenName: 'Watched ngxAutosize Controller',
//   newInstanceOnNull: true,
// });

export const NGX_AUTOSIZE_WATCHED_CONTROLLER = new InjectionToken(
  'Watched ngxAutosize Controller'
);

export const NGX_AUTOSIZE_CONTROLLER_PROVIDER: Provider[] = [
  DestroyedService,
  {
    provide: NGX_AUTOSIZE_WATCHED_CONTROLLER,
    deps: [
      [new Optional(), AutosizeControllerDirective],
      ChangeDetectorRef,
      DestroyedService,
    ],
    useFactory: autosizeControllerFactory,
  },
];

export function autosizeControllerFactory(
  controller: AutosizeControllerDirective | null,
  changeDetectorRef: ChangeDetectorRef,
  destroyed: Observable<void>
) {
  if (!controller) {
    return new AutosizeControllerDirective();
  }

  controller.changes$.pipe(takeUntil(destroyed)).subscribe(() => {
    changeDetectorRef.markForCheck();
  });

  return controller;
}
