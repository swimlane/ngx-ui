// @ts-ignore
import { default as doc } from '!!raw-loader!./docs/doc.md';
// @ts-ignore
import { default as componentTs } from '!!raw-loader!./examples/component.ts';
// @ts-ignore
import { default as moduleTs } from '!!raw-loader!./examples/module.ts';
// @ts-ignore
import { default as sliceTs } from '!!raw-loader!./examples/slice.ts';
// @ts-ignore
import { default as templateHtml } from '!!raw-loader!./examples/template.html';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocExamples } from '@swimlane/ngx-doc';

@Component({
  selector: 'docs-home',
  template: `
    <ngx-doc-page header="NGX-UI">
      <ngx-doc-example heading="Preface" id="preface" [content]="examples">
        <ngx-doc-markdown [code]="doc" filename="doc.md"></ngx-doc-markdown>
      </ngx-doc-example>
    </ngx-doc-page>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  readonly examples: DocExamples = {
    'slice.ts': [sliceTs],
    'component.ts': [componentTs],
    'template.html': [templateHtml, 'markup'],
    'module.ts': [moduleTs],
  };

  readonly doc = doc;

  constructor() {}

  ngOnInit(): void {}
}
