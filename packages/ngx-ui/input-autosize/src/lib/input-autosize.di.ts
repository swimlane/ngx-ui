import {
  ChangeDetectorRef,
  InjectionToken,
  Optional,
  Provider,
} from '@angular/core';
import { DestroyedService } from '@swimlane/ngx-ui/common';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputAutosizeControllerDirective } from './input-autosize.controller';

// TODO: switch to createControllerProviderFactory for Ivy
// export const [
//   NGX_INPUT_AUTOSIZE_WATCHED_CONTROLLER,
//   NGX_INPUT_AUTOSIZE_CONTROLLER_PROVIDER,
// ] = createControllerProviderFactory({
//   controller: InputAutosizeControllerDirective,
//   watchedControllerTokenName: 'Watched ngxInputAutosize Controller',
// });

export const NGX_INPUT_AUTOSIZE_WATCHED_CONTROLLER = new InjectionToken(
  'Watched ngxInputAutosize Controller'
);

export const NGX_INPUT_AUTOSIZE_CONTROLLER_PROVIDER: Provider[] = [
  DestroyedService,
  {
    provide: NGX_INPUT_AUTOSIZE_WATCHED_CONTROLLER,
    deps: [
      [new Optional(), InputAutosizeControllerDirective],
      ChangeDetectorRef,
      DestroyedService,
    ],
    useFactory: inputAutosizeControllerFactory,
  },
];

export function inputAutosizeControllerFactory(
  controller: InputAutosizeControllerDirective | null,
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
