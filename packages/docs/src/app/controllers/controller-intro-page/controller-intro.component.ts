import introMarkdown from '!!raw-loader!./docs/intro.md';
import { Component } from '@angular/core';

@Component({
  selector: 'docs-controller-intro',
  template: `
    <ngx-doc-page header="Controllers">
      <ngx-doc-markdown [code]="introMarkdown"> </ngx-doc-markdown>
    </ngx-doc-page>
  `,
  styles: [],
})
export class ControllerIntroComponent {
  introMarkdown = introMarkdown;

  constructor() {}
}
