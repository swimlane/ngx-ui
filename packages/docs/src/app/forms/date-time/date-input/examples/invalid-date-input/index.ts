import { DocExamples } from '@swimlane/ngx-doc';
import invalidDateInputHtml from '!!raw-loader!./invalid-date-input.component.html';
import invalidDateInputTs from '!!raw-loader!./invalid-date-input.component.ts';

const InvalidDateInputContent: DocExamples = {
  'invalid-date-input.component.html': [invalidDateInputHtml, 'markup'],
  'invalid-date-input.component.ts': [invalidDateInputTs, 'typescript'],
};

export { InvalidDateInputContent, invalidDateInputTs, invalidDateInputHtml };
