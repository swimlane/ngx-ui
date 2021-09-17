import { DocExamples } from '@swimlane/ngx-doc';
import asyncSelectExampleHtml from '!!raw-loader!./async-select-example.component.html';
import asyncSelectExampleTs from '!!raw-loader!./async-select-example.component.ts';

const AsyncSelectExampleContent: DocExamples = {
  'async-select-example.component.html': [asyncSelectExampleHtml, 'markup'],
  'async-select-example.component.ts': [asyncSelectExampleTs, 'typescript'],
};

export {
  AsyncSelectExampleContent,
  asyncSelectExampleTs,
  asyncSelectExampleHtml,
};
