import { PrecisionDateInputContent } from './examples/precision-date-input';
import { MinMaxDateInputContent } from './examples/min-max-date-input';
import { CustomFormatDateInputContent } from './examples/custom-format-date-input';
import { InvalidDateInputContent } from './examples/invalid-date-input';
import { DisabledDateInputContent } from './examples/disabled-date-input';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicDateInputContent } from './examples/basic-date-input';

@Component({
  selector: 'docs-date-input',
  template: `
    <ngx-doc-example
      heading="Basic Date Input"
      id="basic-date-input"
      [content]="basicDateInputExampleContent"
    >
      <docs-basic-date-input></docs-basic-date-input>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Disabled Date Input"
      id="disabled-date-input"
      [content]="disabledDateInputExampleContent"
    >
      <docs-disabled-date-input></docs-disabled-date-input>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Invalid Date Input"
      id="invalid-date-input"
      [content]="invalidDateInputExampleContent"
    >
      <docs-invalid-date-input></docs-invalid-date-input>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Custom Format Date Input"
      id="custom-format-date-input"
      [content]="customFormatDateInputExampleContent"
    >
      <docs-custom-format-date-input></docs-custom-format-date-input>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Min Max Date Input"
      id="min-max-date-input"
      [content]="minMaxDateInputExampleContent"
    >
      <docs-min-max-date-input></docs-min-max-date-input>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Precision Date Input"
      id="precision-date-input"
      [content]="precisionDateInputExampleContent"
    >
      <docs-precision-date-input></docs-precision-date-input>
    </ngx-doc-example>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputComponent {
  readonly basicDateInputExampleContent = BasicDateInputContent;
  readonly disabledDateInputExampleContent = DisabledDateInputContent;
  readonly invalidDateInputExampleContent = InvalidDateInputContent;
  readonly customFormatDateInputExampleContent = CustomFormatDateInputContent;
  readonly minMaxDateInputExampleContent = MinMaxDateInputContent;
  readonly precisionDateInputExampleContent = PrecisionDateInputContent;
}
