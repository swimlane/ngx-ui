import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import textExampleHtml from '!!raw-loader!./examples/input-text-example/input-text-example.component.html'
import textExampleTs from '!!raw-loader!./examples/input-text-example/input-text-example.component.ts'
import { DocExamples } from '@swimlane/ngx-doc';

@Component({
  selector: 'docs-input-text',
  template: `
  <ngx-doc-example heading='Text' id='input-text' [content]='textExamples'>
    <ngx-doc-markdown>
      > (inputChange) only fires onBlur
    </ngx-doc-markdown>
    <docs-input-text-example></docs-input-text-example>
  </ngx-doc-example>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextComponent implements OnInit {
readonly textExamples: DocExamples = {
  'text-example.html': [textExampleHtml, 'markup'],
  'text-example.ts': [textExampleTs]
}
  constructor() { }

  ngOnInit(): void {
  }

}
