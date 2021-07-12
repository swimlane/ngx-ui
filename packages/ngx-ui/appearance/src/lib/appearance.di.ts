import { createControllerProviderFactory } from '@swimlane/ngx-ui/common';
import { AppearanceControllerDirective } from './appearance.controller';

export const [
  NGX_APPEARANCE_WATCHED_CONTROLLER,
  NGX_APPEARANCE_CONTROLLER_PROVIDER,
] = createControllerProviderFactory({
  watchedControllerTokenName: 'Watched ngxAppearance Controller',
  controller: AppearanceControllerDirective,
});

// export const NGX_APPEARANCE_WATCHED_CONTROLLER = new InjectionToken(
//   'Watched ngxAppearance Controller'
// );
//
// export const NGX_APPEARANCE_CONTROLLER_PROVIDER: Provider[] = [
//   DestroyedService,
//   {
//     provide: NGX_APPEARANCE_WATCHED_CONTROLLER,
//     deps: [
//       [new Optional(), AppearanceController],
//       ChangeDetectorRef,
//       DestroyedService,
//     ],
//     useFactory: appearanceControllerFactory,
//   },
// ];
//
// export function appearanceControllerFactory(
//   controller: AppearanceController | null,
//   changeDetectorRef: ChangeDetectorRef,
//   destroyed: Observable<void>
// ) {
//   if (!controller) {
//     return null;
//   }
//
//   controller.changes$.pipe(takeUntil(destroyed)).subscribe(() => {
//     changeDetectorRef.markForCheck();
//   });
//
//   return controller;
// }
