import { DocExamples } from '@swimlane/ngx-doc';
import basicSingleSelectExampleHtml from '!!raw-loader!./basic-single-select-example.component.html';
import basicSingleSelectExampleTS from '!!raw-loader!./basic-single-select-example.component.ts';
const BasicSelectExampleContent: DocExamples = {
  'basic-select-example.html': [basicSingleSelectExampleHtml, 'markup'],
  'basic-select-example.ts': [basicSingleSelectExampleTS, 'typescript'],
};

export {
  BasicSelectExampleContent,
  basicSingleSelectExampleTS,
  basicSingleSelectExampleHtml,
};
