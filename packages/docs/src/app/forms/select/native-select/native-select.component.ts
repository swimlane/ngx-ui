import { Component } from '@angular/core';
import { NativeSelectExampleContent } from './examples/native-select-example';

@Component({
  selector: 'docs-native-select',
  template: `
    <ngx-doc-example
      heading="Native"
      id="native-select"
      [content]="nativeExample"
    >
      <docs-native-select-example></docs-native-select-example>
    </ngx-doc-example>
  `,
})
export class NativeSelectComponent {
  readonly nativeExample = NativeSelectExampleContent;
}
