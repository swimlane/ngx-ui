import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocExamples } from '@swimlane/ngx-doc';
import {
  textDefaultHtml,
  textDefaultTs,
} from './examples/input-text-default-value-example';
import {
  textDisabledHtml,
  textDisabledTs,
} from './examples/input-text-disabled-example';
import { textExampleHtml, textExampleTs } from './examples/input-text-example';
import {
  textNoLabelHtml,
  textNoLabelTs,
} from './examples/input-text-no-label-example';
import {
  textPrefixSuffixHtml,
  textPrefixSuffixTs,
} from './examples/input-text-prefix-suffix-example';
import {
  textRequiredHtml,
  textRequiredTs,
} from './examples/input-text-required-example';
import {
  textUnlockableHtml,
  textUnlockableTs,
} from './examples/input-text-unlockable-example';

@Component({
  selector: 'docs-input-text',
  template: `
    <ngx-doc-example heading="Text">
      <ngx-doc-markdown> > (inputChange) only fires onBlur</ngx-doc-markdown>
      <ngx-doc-example heading="Simple" id="simple" [content]="textExamples">
        <docs-input-text-example></docs-input-text-example>
      </ngx-doc-example>

      <ngx-doc-example
        heading="No Label"
        id="no-label"
        [content]="textNoLabelExamples"
      >
        <docs-input-text-no-label-example></docs-input-text-no-label-example>
      </ngx-doc-example>

      <ngx-doc-example
        heading="Prefix & Suffix"
        id="prefix-suffix"
        [content]="textPrefixSuffixExamples"
      >
        <docs-input-text-prefix-suffix-example></docs-input-text-prefix-suffix-example>
      </ngx-doc-example>

      <ngx-doc-example
        heading="Disabled"
        id="disabled"
        [content]="textDisabledExamples"
      >
        <docs-input-text-disabled-example></docs-input-text-disabled-example>
      </ngx-doc-example>

      <ngx-doc-example
        heading="Unlockable"
        id="unlockable"
        [content]="textUnlockableExamples"
      >
        <docs-input-text-unlockable-example></docs-input-text-unlockable-example>
      </ngx-doc-example>

      <ngx-doc-example
        heading="Required"
        id="required"
        [content]="textRequiredExamples"
      >
        <docs-input-text-required-example></docs-input-text-required-example>
      </ngx-doc-example>

      <ngx-doc-example
        heading="Default Value"
        id="default-value"
        [content]="textDefaultExamples"
      >
        <docs-input-text-default-value-example></docs-input-text-default-value-example>
      </ngx-doc-example>
    </ngx-doc-example>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent implements OnInit {
  readonly textExamples: DocExamples = {
    'text-example.html': [textExampleHtml, 'markup'],
    'text-example.ts': [textExampleTs],
  };

  readonly textNoLabelExamples: DocExamples = {
    'text-no-label-example.html': [textNoLabelHtml, 'markup'],
    'text-no-label-example.ts': [textNoLabelTs],
  };

  readonly textPrefixSuffixExamples: DocExamples = {
    'text-prefix-suffix-example.html': [textPrefixSuffixHtml, 'markup'],
    'text-prefix-suffix-example.ts': [textPrefixSuffixTs],
  };

  readonly textDisabledExamples: DocExamples = {
    'text-disabled-example.html': [textDisabledHtml, 'markup'],
    'text-disabled-example.ts': [textDisabledTs],
  };

  readonly textUnlockableExamples: DocExamples = {
    'text-unlockable-example.html': [textUnlockableHtml, 'markup'],
    'text-unlockable-example.ts': [textUnlockableTs],
  };

  readonly textRequiredExamples: DocExamples = {
    'text-required-example.html': [textRequiredHtml, 'markup'],
    'text-required-example.ts': [textRequiredTs],
  };

  readonly textDefaultExamples: DocExamples = {
    'text-default-example.html': [textDefaultHtml, 'markup'],
    'text-default-example.ts': [textDefaultTs],
  };

  constructor() {}

  ngOnInit(): void {}
}
