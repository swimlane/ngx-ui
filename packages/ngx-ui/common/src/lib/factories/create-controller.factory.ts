import {
  ChangeDetectorRef,
  InjectionToken,
  Optional,
  Provider,
  Type,
} from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Controller } from '../abstracts';
import { DestroyedService } from '../services';

export interface CreateControllerTokenFactoryOptions<
  TController extends Controller
> {
  watchedControllerTokenName: string;
  controller: Type<TController>;
}

export function controllerFactory<TController extends Controller>(
  controller: TController | null,
  changeDetectorRef: ChangeDetectorRef,
  destroyed: Observable<void>
): TController | null {
  if (!controller) return null;

  controller.changes$.pipe(takeUntil(destroyed)).subscribe(() => {
    changeDetectorRef.markForCheck();
  });

  return controller;
}

export function createControllerProviderFactory<
  TController extends Controller
>({
  watchedControllerTokenName,
  controller,
}: CreateControllerTokenFactoryOptions<TController>): [
  InjectionToken<TController>,
  Provider[]
] {
  const watchedControllerToken = new InjectionToken(watchedControllerTokenName);

  const controllerProvider: Provider[] = [
    DestroyedService,
    {
      provide: watchedControllerToken,
      deps: [[new Optional(), controller], ChangeDetectorRef, DestroyedService],
      useFactory: controllerFactory,
    },
  ];

  return [watchedControllerToken, controllerProvider];
}
