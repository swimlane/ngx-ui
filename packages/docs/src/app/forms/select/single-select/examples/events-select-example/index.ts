import { DocExamples } from '@swimlane/ngx-doc';
import eventsSelectExampleHtml from '!!raw-loader!./events-select-example.component.html';
import eventsSelectExampleTs from '!!raw-loader!./events-select-example.component.ts';

const EventsSelectExampleContent: DocExamples = {
  'events-select-example.component.html': [eventsSelectExampleHtml, 'markup'],
  'events-select-example.component.ts': [eventsSelectExampleTs, 'typescript'],
};

export {
  EventsSelectExampleContent,
  eventsSelectExampleTs,
  eventsSelectExampleHtml,
};
