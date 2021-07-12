import { createControllerProviderFactory } from '@swimlane/ngx-ui/common';
import { InputAutosizeControllerDirective } from './input-autosize.controller';

export const [
  NGX_INPUT_AUTOSIZE_WATCHED_CONTROLLER,
  NGX_INPUT_AUTOSIZE_CONTROLLER_PROVIDER,
] = createControllerProviderFactory({
  controller: InputAutosizeControllerDirective,
  watchedControllerTokenName: 'Watched ngxAutosize Controller',
});
