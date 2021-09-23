import requiredSelectExampleHtml from '!!raw-loader!./required-select-example.component.html';
import requiredSelectExampleTs from '!!raw-loader!./required-select-example.component.ts';
import { DocExamples } from '@swimlane/ngx-doc';

const RequiredSelectExampleContent: DocExamples = {
  'required-select-example.html': [requiredSelectExampleHtml, 'markup'],
  'required-select-example.ts': [requiredSelectExampleTs, 'typescript'],
};
export {
  RequiredSelectExampleContent,
  requiredSelectExampleTs,
  requiredSelectExampleHtml,
};
