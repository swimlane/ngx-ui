import { Component } from '@angular/core';
import { BasicTaggingSelectExampleContent } from './examples/basic-tagging-select-example';
import { NoOptionsTaggingSelectExampleContent } from './examples/no-options-tagging-select-example';

@Component({
  selector: 'docs-tagging-select',
  template: `
    <ngx-doc-example
      heading="Basic"
      id="basic-tagging-select"
      [content]="basicExample"
    >
      <docs-basic-tagging-select-example></docs-basic-tagging-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="No Options"
      id="no-options"
      [content]="noOptionsExample"
    >
      <docs-no-options-tagging-select-example></docs-no-options-tagging-select-example>
    </ngx-doc-example>
  `,
})
export class TaggingSelectComponent {
  readonly basicExample = BasicTaggingSelectExampleContent;
  readonly noOptionsExample = NoOptionsTaggingSelectExampleContent;
}
