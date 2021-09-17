import { DocExamples } from '@swimlane/ngx-doc';
import nativeSelectExampleHtml from '!!raw-loader!./native-select-example.component.html';
import nativeSelectExampleTs from '!!raw-loader!./native-select-example.component.ts';

const NativeSelectExampleContent: DocExamples = {
  'native-select-example.component.html': [nativeSelectExampleHtml, 'markup'],
  'native-select-example.component.ts': [nativeSelectExampleTs, 'typescript'],
};

export {
  NativeSelectExampleContent,
  nativeSelectExampleTs,
  nativeSelectExampleHtml,
};
