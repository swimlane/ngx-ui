import introMd from '!!raw-loader!./docs/button-intro.md';
import { Component } from '@angular/core';

@Component({
  selector: 'docs-button-page',
  template: `
    <ngx-doc-page header="Buttons">
      <ng-template ngxDocPageTab>
        <docs-css-button></docs-css-button>
        <docs-ngx-button></docs-ngx-button>
        <docs-file-upload-button></docs-file-upload-button>
        <docs-long-press-button></docs-long-press-button>
      </ng-template>
    </ngx-doc-page>
  `,
  styles: [],
})
export class ButtonPageComponent {
  readonly introMd = introMd;
}
