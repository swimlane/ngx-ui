import headingsHtml from '!!raw-loader!./examples/headings.html';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-typography-headings',
  template: `
    <ngx-doc-example heading="Headings" id="headings">
      <h1>
        h1. Improve your Security Operations
        <small>Insight and Automation</small>
      </h1>
      <h2>
        h2. Improve your Security Operations
        <small>Insight and Automation</small>
      </h2>
      <h3>
        h3. Improve your Security Operations
        <small>Insight and Automation</small>
      </h3>
      <h4>
        h4. Improve your Security Operations
        <small>Insight and Automation</small>
      </h4>
      <h5>
        h5. Improve your Security Operations
        <small>Insight and Automation</small>
      </h5>

      <ngx-doc-markdown [code]="headingsHtml" lang="markup"></ngx-doc-markdown>
    </ngx-doc-example>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyHeadingsComponent {
  readonly headingsHtml = headingsHtml;
}
