import { DocExamples } from '@swimlane/ngx-doc';
import filterSelectExampleHtml from '!!raw-loader!./filter-select-example.component.html';
import filterSelectExampleTs from '!!raw-loader!./filter-select-example.component.ts';

const FilterSelectExampleContent: DocExamples = {
  'filter-select-example.component.html': [filterSelectExampleHtml, 'markup'],
  'filter-select-example.component.ts': [filterSelectExampleTs, 'typescript'],
};

export {
  FilterSelectExampleContent,
  filterSelectExampleTs,
  filterSelectExampleHtml,
};
