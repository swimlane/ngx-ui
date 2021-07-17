import anchorsHtml from '!!raw-loader!./examples/anchors.html';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-typography-anchors',
  template: `
    <ngx-doc-example heading="Anchors" id="anchors">
      <a href="/">Default</a>
      <span style="padding: 0 15px">|</span>
      <a href="/" class="disabled">Disabled</a>

      <ngx-doc-markdown [code]="anchorsHtml" lang="markup"></ngx-doc-markdown>
    </ngx-doc-example>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyAnchorsComponent {
  readonly anchorsHtml = anchorsHtml;
}
