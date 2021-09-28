import { AutosizeDateTimeInputContent } from './examples/autosize-date-time-input';
import { LegacyDateTimeInputAppearancesContent } from './examples/legacy-date-time-input-appearances';
import { FillDateTimeInputAppearancesContent } from './examples/fill-date-time-input-appearances';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-date-time-appearances',
  template: `
    <ngx-doc-example
      heading="Fill Date Time Input Appearances"
      id="fill-date-time-input-appearances"
      [content]="fillDateTimeInputAppearancesExampleContent"
    >
      <docs-fill-date-time-input-appearances></docs-fill-date-time-input-appearances>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Legacy Date Time Input Appearances"
      id="legacy-date-time-input-appearances"
      [content]="legacyDateTimeInputAppearancesExampleContent"
    >
      <docs-legacy-date-time-input-appearances></docs-legacy-date-time-input-appearances>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Autosize Date Time Input"
      id="autosize-date-time-input"
      [content]="autosizeDateTimeInputExampleContent"
    >
      <docs-autosize-date-time-input></docs-autosize-date-time-input>
    </ngx-doc-example>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeAppearancesComponent {
  readonly fillDateTimeInputAppearancesExampleContent =
    FillDateTimeInputAppearancesContent;
  readonly legacyDateTimeInputAppearancesExampleContent =
    LegacyDateTimeInputAppearancesContent;
  readonly autosizeDateTimeInputExampleContent = AutosizeDateTimeInputContent;
}
