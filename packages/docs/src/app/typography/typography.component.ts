import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-typography',
  template: `
    <ngx-doc-page header="Typography">
      <ngx-doc-markdown>
        Out of the box styling for headings, paragraphs, links, and codeblocks.
      </ngx-doc-markdown>
      <docs-typography-fonts></docs-typography-fonts>
      <docs-typography-headings></docs-typography-headings>
      <docs-typography-css-helpers></docs-typography-css-helpers>
      <docs-typography-anchors></docs-typography-anchors>
      <docs-typography-paragraphs></docs-typography-paragraphs>
      <docs-typography-code></docs-typography-code>
    </ngx-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyComponent {}
