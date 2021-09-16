import { Component } from '@angular/core';
import { DocExamples } from '@swimlane/ngx-doc';
import { cssButtonExampleHtml } from './examples/css-button-example';
import { cssButtonSizesExampleHtml } from './examples/css-button-sizes-example';
import { cssIconButtonExampleHtml } from './examples/css-icon-button-example';
import { cssLinkButtonExampleHtml } from './examples/css-link-buttons-example';

@Component({
  selector: 'docs-css-button',
  template: `
    <ngx-doc-example
      heading="CSS Buttons"
      id="css-buttons"
      [content]="cssButtonExample"
    >
      <docs-css-basic-button-example></docs-css-basic-button-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="CSS Buttons With Icon"
      id="css-icon-buttons"
      [content]="cssIconButtonExample"
    >
      <docs-css-icon-button-example></docs-css-icon-button-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="CSS Buttons Sizes"
      id="css-buttons-sizes"
      [content]="cssButtonSizesExample"
    >
      <docs-css-button-sizes-example></docs-css-button-sizes-example>
    </ngx-doc-example>

    <ngx-doc-example
      heading="CSS Link Buttons"
      id="css-buttons-sizes"
      [content]="cssButtonLinkExample"
    >
      <ngx-doc-markdown>
        > Notes: TODO a button is a button is a button</ngx-doc-markdown
      >
      <docs-css-link-button-example></docs-css-link-button-example>
    </ngx-doc-example>
  `,
})
export class CssButtonComponent {
  readonly cssButtonExample: DocExamples = {
    'css-button-example.html': [cssButtonExampleHtml, 'markup'],
  };
  readonly cssIconButtonExample: DocExamples = {
    'css-icon-button-example.html': [cssIconButtonExampleHtml, 'markup'],
  };

  readonly cssButtonSizesExample: DocExamples = {
    'css-button-sizes-example.html': [cssButtonSizesExampleHtml, 'markup'],
  };

  readonly cssButtonLinkExample: DocExamples = {
    'css-button-link-example.html': [cssLinkButtonExampleHtml, 'markup'],
  };
}
