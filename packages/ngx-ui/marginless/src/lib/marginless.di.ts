import { createControllerProviderFactory } from '@swimlane/ngx-ui/common';
import { MarginlessControllerDirective } from './marginless.controller';

export const [
  NGX_MARGINLESS_WATCHED_CONTROLLER,
  NGX_MARGINLESS_CONTROLLER_PROVIDER,
] = createControllerProviderFactory({
  controller: MarginlessControllerDirective,
  watchedControllerTokenName: 'Watched ngxMarginless Controller',
});
