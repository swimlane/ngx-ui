import codeHtml from '!!raw-loader!./examples/code.html';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-typography-code',
  template: `
    <ngx-doc-example heading="Code" id="code">
      <pre>var foo</pre>

      <ngx-doc-markdown [code]="codeHtml" lang="markup"></ngx-doc-markdown>
    </ngx-doc-example>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyCodeComponent {
  readonly codeHtml = codeHtml;
}
