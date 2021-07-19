import appearanceMd from '!!raw-loader!./docs/appearance-controller.md';
import autofocusMd from '!!raw-loader!./docs/autofocus-controller.md';
import autosizeMd from '!!raw-loader!./docs/autosize-controller.md';
import inputAttributeControllerMd from '!!raw-loader!./docs/input-attribute-controller.md';
import marginlessMd from '!!raw-loader!./docs/marginless-controller.md';
import sizeMd from '!!raw-loader!./docs/size-controller.md';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-controller-form',
  template: `
    <ngx-doc-page header="Form Controllers">
      <ngx-doc-example heading="Input Attribute" id="input-attribute">
        <ngx-doc-markdown
          [code]="inputAttributeControllerMd"
        ></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Size" id="size">
        <ngx-doc-markdown [code]="sizeMd"></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Appearance" id="appearance">
        <ngx-doc-markdown [code]="appearanceMd"></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Marginless" id="marginless">
        <ngx-doc-markdown [code]="marginlessMd"></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Autosize" id="autosize">
        <ngx-doc-markdown [code]="autosizeMd"></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Autofocus" id="autofocus">
        <ngx-doc-markdown [code]="autofocusMd"></ngx-doc-markdown>
      </ngx-doc-example>
    </ngx-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControllerFormComponent {
  readonly inputAttributeControllerMd = inputAttributeControllerMd;
  readonly sizeMd = sizeMd;
  readonly appearanceMd = appearanceMd;
  readonly marginlessMd = marginlessMd;
  readonly autofocusMd = autofocusMd;
  readonly autosizeMd = autosizeMd;
}
