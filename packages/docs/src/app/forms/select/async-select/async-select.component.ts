import { Component } from '@angular/core';
import { AsyncSelectExampleContent } from './examples/async-select-example';

@Component({
  selector: 'docs-async-select',
  template: `
    <ngx-doc-example heading="Async" id="async-select" [content]="asyncExample">
      <docs-async-select-example></docs-async-select-example>
    </ngx-doc-example>
  `,
})
export class AsyncSelectComponent {
  readonly asyncExample = AsyncSelectExampleContent;
}
