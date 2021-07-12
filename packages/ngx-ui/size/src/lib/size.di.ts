import { createControllerProviderFactory } from '@swimlane/ngx-ui/common';
import { SizeControllerDirective } from './size.controller';

export const [NGX_SIZE_WATCHED_CONTROLLER, NGX_SIZE_CONTROLLER_PROVIDER] =
  createControllerProviderFactory({
    controller: SizeControllerDirective,
    watchedControllerTokenName: 'Watched ngxSize Controller',
    newInstanceOnNull: true,
  });
