import { Component } from '@angular/core';
import { DocExamples } from '@swimlane/ngx-doc';
import {
  longPressButtonExampleHtml,
  longPressButtonExampleTs,
} from './examples/long-press-button-example';

@Component({
  selector: 'docs-long-press-button',
  template: `
    <ngx-doc-example
      heading="Long Press"
      id="long-press-button"
      [content]="longPressExample"
    >
      <docs-long-press-button-example></docs-long-press-button-example>
    </ngx-doc-example>
  `,
})
export class NgxLongPressButtonComponent {
  readonly longPressExample: DocExamples = {
    'long-press-button-example.html': [longPressButtonExampleHtml, 'markup'],
    'long-press-button-example.ts': [longPressButtonExampleTs, 'typescript'],
  };
}
