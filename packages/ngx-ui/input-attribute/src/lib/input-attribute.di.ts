import { createControllerProviderFactory } from '@swimlane/ngx-ui/common';
import { InputAttributeControllerDirective } from './input-attribute.controller';

export const [
  NGX_INPUT_ATTRIBUTE_WATCHED_CONTROLLER,
  NGX_INPUT_ATTRIBUTE_CONTROLLER_PROVIDER,
] = createControllerProviderFactory({
  controller: InputAttributeControllerDirective,
  watchedControllerTokenName: 'Watched ngxInputAttribute Controller',
});
