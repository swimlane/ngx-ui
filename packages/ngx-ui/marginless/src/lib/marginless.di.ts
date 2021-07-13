import {
  ChangeDetectorRef,
  InjectionToken,
  Optional,
  Provider,
} from '@angular/core';
import { DestroyedService } from '@swimlane/ngx-ui/common';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MarginlessControllerDirective } from './marginless.controller';

// TODO: switch to createControllerProviderFactory for Ivy
// export const [
//   NGX_MARGINLESS_WATCHED_CONTROLLER,
//   NGX_MARGINLESS_CONTROLLER_PROVIDER,
// ] = createControllerProviderFactory({
//   controller: MarginlessControllerDirective,
//   watchedControllerTokenName: 'Watched ngxMarginless Controller',
//   newInstanceOnNull: true,
// });

export const NGX_MARGINLESS_WATCHED_CONTROLLER = new InjectionToken(
  'Watched ngxMarginless Controller'
);

export const NGX_MARGINLESS_CONTROLLER_PROVIDER: Provider[] = [
  DestroyedService,
  {
    provide: NGX_MARGINLESS_WATCHED_CONTROLLER,
    deps: [
      [new Optional(), MarginlessControllerDirective],
      ChangeDetectorRef,
      DestroyedService,
    ],
    useFactory: marginlessControllerFactory,
  },
];

export function marginlessControllerFactory(
  controller: MarginlessControllerDirective | null,
  changeDetectorRef: ChangeDetectorRef,
  destroyed: Observable<void>
) {
  if (!controller) {
    return new MarginlessControllerDirective();
  }

  controller.changes$.pipe(takeUntil(destroyed)).subscribe(() => {
    changeDetectorRef.markForCheck();
  });

  return controller;
}
