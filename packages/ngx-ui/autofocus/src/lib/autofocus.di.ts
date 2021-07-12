import { createControllerProviderFactory } from '@swimlane/ngx-ui/common';
import { AutofocusControllerDirective } from './autofocus.controller';

export const [
  NGX_AUTOFOCUS_WATCHED_CONTROLLER,
  NGX_AUTOFOCUS_CONTROLLER_PROVIDER,
] = createControllerProviderFactory({
  controller: AutofocusControllerDirective,
  watchedControllerTokenName: 'Watched ngxAutofocus Controller',
});
