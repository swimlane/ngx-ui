import {
  ChangeDetectorRef,
  InjectionToken,
  Optional,
  Provider,
} from '@angular/core';
import { DestroyedService } from '@swimlane/ngx-ui/common';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AutofocusControllerDirective } from './autofocus.controller';

// TODO: switch to createControllerProviderFactory for Ivy
// export const [
//   NGX_AUTOFOCUS_WATCHED_CONTROLLER,
//   NGX_AUTOFOCUS_CONTROLLER_PROVIDER,
// ] = createControllerProviderFactory({
//   controller: AutofocusControllerDirective,
//   watchedControllerTokenName: 'Watched ngxAutofocus Controller',
// });

export const NGX_AUTOFOCUS_WATCHED_CONTROLLER = new InjectionToken(
  'Watched ngxAutofocus Controller'
);

export const NGX_AUTOFOCUS_CONTROLLER_PROVIDER: Provider[] = [
  DestroyedService,
  {
    provide: NGX_AUTOFOCUS_WATCHED_CONTROLLER,
    deps: [
      [new Optional(), AutofocusControllerDirective],
      ChangeDetectorRef,
      DestroyedService,
    ],
    useFactory: autofocusControllerFactory,
  },
];

export function autofocusControllerFactory(
  controller: AutofocusControllerDirective | null,
  changeDetectorRef: ChangeDetectorRef,
  destroyed: Observable<void>
) {
  if (!controller) {
    return null;
  }

  controller.changes$.pipe(takeUntil(destroyed)).subscribe(() => {
    changeDetectorRef.markForCheck();
  });

  return controller;
}
