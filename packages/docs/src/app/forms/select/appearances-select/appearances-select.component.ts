import { Component } from '@angular/core';
import { FillAppearancesSelectExampleContent } from './examples/fill-appearances-select-example';
import { LegacyAppearancesSelectExampleContent } from './examples/legacy-appearances-select-example';

@Component({
  selector: 'docs-appearance-select',
  template: `
    <ngx-doc-example
      heading="Legacy"
      id="legacy-select"
      [content]="legacyExample"
    >
      <docs-legacy-appearances-select-example></docs-legacy-appearances-select-example>
    </ngx-doc-example>

    <ngx-doc-example heading="Fill" id="fill-select" [content]="fillExample">
      <docs-fill-appearances-select-example></docs-fill-appearances-select-example>
    </ngx-doc-example>
  `,
})
export class AppearancesSelectComponent {
  readonly legacyExample = LegacyAppearancesSelectExampleContent;

  readonly fillExample = FillAppearancesSelectExampleContent;
}
