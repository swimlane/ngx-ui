import { DocExamples } from '@swimlane/ngx-doc';
import basicDateTimeHtml from '!!raw-loader!./basic-date-time.component.html';
import basicDateTimeTs from '!!raw-loader!./basic-date-time.component.ts';

const BasicDateTimeContent: DocExamples = {
  'basic-date-time.component.html': [basicDateTimeHtml, 'markup'],
  'basic-date-time.component.ts': [basicDateTimeTs, 'typescript'],
};

export { BasicDateTimeContent, basicDateTimeTs, basicDateTimeHtml };
