import { Component } from '@angular/core';
import { DocExamples } from '@swimlane/ngx-doc';
import {
  basicNgxButtonExampleHtml,
  basicNgxButtonExampleTs,
} from './examples/basic-ngx-button';

@Component({
  selector: 'docs-ngx-button',
  template: `
    <ngx-doc-example
      heading="ngx-button"
      id="ngx-button"
      [content]="basicNgxButtonExamples"
    >
      <ngx-doc-markdown>
        > Note: Buttons randomly will success/fail. See TS file for logic
      </ngx-doc-markdown>
      <docs-basic-ngx-button-example></docs-basic-ngx-button-example>
    </ngx-doc-example>
  `,
})
export class NgxButtonComponent {
  readonly basicNgxButtonExamples: DocExamples = {
    'ngx-button-example.html': [basicNgxButtonExampleHtml, 'markup'],
    'ngx-button-example.ts': [basicNgxButtonExampleTs, 'typescript'],
  };
}
