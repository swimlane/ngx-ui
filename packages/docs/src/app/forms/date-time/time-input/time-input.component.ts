import { PrecisionTimeInputContent } from './examples/precision-time-input';
import { BasicTimeInputContent } from './examples/basic-time-input';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-time-input',
  template: `
    <ngx-doc-example
      heading="Basic Time Input"
      id="basic-time-input"
      [content]="basicTimeInputExampleContent"
    >
      <docs-basic-time-input></docs-basic-time-input>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Precision Time Input"
      id="precision-time-input"
      [content]="precisionTimeInputExampleContent"
    >
      <docs-precision-time-input></docs-precision-time-input>
    </ngx-doc-example>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeInputComponent {
  readonly basicTimeInputExampleContent = BasicTimeInputContent;
  readonly precisionTimeInputExampleContent = PrecisionTimeInputContent;
}
