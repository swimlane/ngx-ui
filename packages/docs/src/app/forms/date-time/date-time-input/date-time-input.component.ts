import { PrecisionDateTimeContent } from './examples/precision-date-time';
import { BasicDateTimeContent } from './examples/basic-date-time';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-date-time-input',
  template: `
    <ngx-doc-example
      heading="Basic Date Time"
      id="basic-date-time"
      [content]="basicDateTimeExampleContent"
    >
      <docs-basic-date-time></docs-basic-date-time>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Precision Date Time"
      id="precision-date-time"
      [content]="precisionDateTimeExampleContent"
    >
      <docs-precision-date-time></docs-precision-date-time>
    </ngx-doc-example>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeInputComponent {
  readonly basicDateTimeExampleContent = BasicDateTimeContent;
  readonly precisionDateTimeExampleContent = PrecisionDateTimeContent;
}
