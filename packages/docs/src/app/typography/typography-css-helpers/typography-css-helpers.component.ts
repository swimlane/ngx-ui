import cssHelpersMd from '!!raw-loader!./docs/css-helpers.md';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-typography-css-helpers',
  template: `
    <ngx-doc-example heading="CSS Helpers" id="css-helpers">
      <ul>
        <li>
          <span>regular</span>
        </li>
        <li>
          <span class="hint">hint</span>
        </li>
        <li>
          <span class="thin">thin</span>
        </li>
        <li>
          <span class="ultra-thin">ultra-thin</span>
        </li>
      </ul>

      <ngx-doc-markdown [code]="cssHelpersMd"></ngx-doc-markdown>
    </ngx-doc-example>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyCssHelpersComponent {
  readonly cssHelpersMd = cssHelpersMd;
}
