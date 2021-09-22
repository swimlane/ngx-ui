import {
  ChangeDetectorRef,
  InjectionToken,
  Optional,
  Provider,
} from '@angular/core';
import { DestroyedService } from '@swimlane/ngx-ui/common';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputAttributeControllerDirective } from './input-attribute.controller';

// TODO: switch to createControllerProviderFactory for Ivy
// export const [
//   NGX_INPUT_ATTRIBUTE_WATCHED_CONTROLLER,
//   NGX_INPUT_ATTRIBUTE_CONTROLLER_PROVIDER,
// ] = createControllerProviderFactory({
//   controller: InputAttributeControllerDirective,
//   watchedControllerTokenName: 'Watched ngxInputAttribute Controller',
// });

export const NGX_INPUT_ATTRIBUTE_WATCHED_CONTROLLER = new InjectionToken(
  'Watched ngxInputAttribute Controller'
);

export const NGX_INPUT_ATTRIBUTE_CONTROLLER_PROVIDER: Provider[] = [
  DestroyedService,
  {
    provide: NGX_INPUT_ATTRIBUTE_WATCHED_CONTROLLER,
    deps: [
      [new Optional(), InputAttributeControllerDirective],
      ChangeDetectorRef,
      DestroyedService,
    ],
    useFactory: inputAttributeControllerFactory,
  },
];

export function inputAttributeControllerFactory(
  controller: InputAttributeControllerDirective | null,
  changeDetectorRef: ChangeDetectorRef,
  destroyed: Observable<void>
) {
  if (!controller) {
    return new InputAttributeControllerDirective(changeDetectorRef);
  }

  controller.changes$.pipe(takeUntil(destroyed)).subscribe(() => {
    changeDetectorRef.markForCheck();
  });

  return controller;
}
