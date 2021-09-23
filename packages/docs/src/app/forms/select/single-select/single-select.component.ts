import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AddNewSelectExampleContent } from './examples/add-new-select-example';
import { BasicSelectExampleContent } from './examples/basic-single-select-example';
import { CustomizationSelectExampleContent } from './examples/customization-select-example';
import { DisabledPlaceholderSelectExampleContent } from './examples/disabled-placeholder-select-example';
import { DisabledPreselectSelectExampleContent } from './examples/disabled-preselect-select-example';
import { EventsSelectExampleContent } from './examples/events-select-example';
import { FilterSelectExampleContent } from './examples/filter-select-example';
import { GroupingSelectExampleContent } from './examples/grouping-select-example';
import { GroupingTemplateSelectExampleContent } from './examples/grouping-template-select-example';
import { HiddenDisabledSelectExampleContent } from './examples/hidden-disabled-select-example';
import { LongValuesSelectExampleContent } from './examples/long-values-select-example';
import { NoOptionsSelectExampleContent } from './examples/no-options-select-example';
import { PreselectedHiddenSelectExampleContent } from './examples/preselected-hidden-select-example';
import { RequiredSelectExampleContent } from './examples/required-select-example';
import { TemplateSelectExampleContent } from './examples/template-select-example';

@Component({
  selector: 'docs-single-select',
  template: `
    <ngx-doc-markdown>
      > Note: Values from single selects are string arrays</ngx-doc-markdown
    >
    <ngx-doc-example
      heading="Basic Select"
      id="basic-select"
      [content]="basicSelectExample"
    >
      <docs-basic-single-select-example></docs-basic-single-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Required Select"
      id="required-select"
      [content]="requiredSelectExample"
    >
      <docs-required-select-example></docs-required-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Filtering"
      id="filter-select"
      [content]="filterSelectExample"
    >
      <docs-filter-select-example></docs-filter-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Add New"
      id="add-new-select"
      [content]="addNewSelectExample"
    >
      <docs-add-new-select-example></docs-add-new-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Long Values"
      id="long-values-select"
      [content]="longValuesExample"
    >
      <docs-long-values-select-example></docs-long-values-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Input and Option Templates"
      id="template-select"
      [content]="templateExamples"
    >
      <docs-template-select-example></docs-template-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Objects with Grouping"
      id="object-grouping-select"
      [content]="objectGroupingExample"
    >
      <docs-grouping-select-example></docs-grouping-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Objects with Grouping and Templates"
      id="grouping-template-select"
      [content]="groupingTemplateExample"
    >
      <docs-grouping-template-select-example></docs-grouping-template-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Disabled Options with Placeholder"
      id="disabled-option-placeholder-select"
      [content]="disabledOptionPlaceholderExample"
    >
      <docs-disabled-placeholder-select-example></docs-disabled-placeholder-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Hidden Disabled Options"
      id="hidden-disabled-options-select"
      [content]="hiddenDisabledOptionsExample"
    >
      <docs-hidden-disabled-select-example></docs-hidden-disabled-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Disabled Select with Preselected Value"
      id="disabled-preselected-select"
      [content]="disabledPreselectedExample"
    >
      <docs-disabled-preselect-select-example></docs-disabled-preselect-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Preselected Value as Hidden Option"
      id="hidden-preselected-value-select"
      [content]="hiddenPreselectedExample"
    >
      <docs-preselected-hidden-select-example></docs-preselected-hidden-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="No Options"
      id="no-option-select"
      [content]="noOptionExample"
    >
      <docs-no-options-select-example></docs-no-options-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Events"
      id="events-select"
      [content]="eventsExample"
    >
      <docs-events-select-example></docs-events-select-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Customization"
      id="customization-select"
      [content]="customizationExample"
    >
      <docs-customization-select-example></docs-customization-select-example>
    </ngx-doc-example>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleSelectComponent {
  readonly basicSelectExample = BasicSelectExampleContent;
  readonly requiredSelectExample = RequiredSelectExampleContent;
  readonly addNewSelectExample = AddNewSelectExampleContent;
  readonly filterSelectExample = FilterSelectExampleContent;
  readonly longValuesExample = LongValuesSelectExampleContent;
  readonly templateExamples = TemplateSelectExampleContent;
  readonly objectGroupingExample = GroupingSelectExampleContent;
  readonly groupingTemplateExample = GroupingTemplateSelectExampleContent;
  readonly disabledOptionPlaceholderExample =
    DisabledPlaceholderSelectExampleContent;
  readonly hiddenDisabledOptionsExample = HiddenDisabledSelectExampleContent;
  readonly disabledPreselectedExample = DisabledPreselectSelectExampleContent;
  readonly hiddenPreselectedExample = PreselectedHiddenSelectExampleContent;
  readonly noOptionExample = NoOptionsSelectExampleContent;
  readonly eventsExample = EventsSelectExampleContent;
  readonly customizationExample = CustomizationSelectExampleContent;
}
