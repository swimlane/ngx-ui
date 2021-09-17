import { Component } from '@angular/core';
import { AutoCloseMultiselectExampleContent } from './examples/auto-close-multiselect-example';
import { BasicMultiselectExampleContent } from './examples/basic-multiselect-example';
import { MinMaxMultiselectExampleContent } from './examples/min-max-multiselect-example';
import { MultiDefaultMultiselectExampleContent } from './examples/multi-default-multiselect-example';
import { TemplatesMultiselectExampleContent } from './examples/templates-multiselect-example';

@Component({
  selector: 'docs-multi-select',
  template: `
    <ngx-doc-example
      heading="Basic"
      id="basic-multi-select"
      [content]="basicExample"
    >
      <docs-basic-multiselect-example></docs-basic-multiselect-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Min/Max Selections"
      id="min-max-multi-select"
      [content]="minMaxExample"
    >
      <docs-min-max-multiselect-example></docs-min-max-multiselect-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Auto Close on Select"
      id="auto-close-multi-select"
      [content]="autoCloseExample"
    >
    </ngx-doc-example>

    <ngx-doc-example
      heading="Multiple Default Selections"
      id="multi-default-multi-select"
      [content]="multiSelectionExample"
    >
    </ngx-doc-example>

    <ngx-doc-example
      heading="Templates"
      id="templates-multi-select"
      [content]="templatesExample"
    >
    </ngx-doc-example>
  `,
})
export class MultiSelectComponent {
  readonly basicExample = BasicMultiselectExampleContent;
  readonly minMaxExample = MinMaxMultiselectExampleContent;
  readonly autoCloseExample = AutoCloseMultiselectExampleContent;
  readonly multiSelectionExample = MultiDefaultMultiselectExampleContent;
  readonly templatesExample = TemplatesMultiselectExampleContent;
}
