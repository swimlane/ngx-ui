import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'docs-color-title',
  template: `
    <h5 class="text-lg font-bold">{{ color }}</h5>
    <code class="text-xs tracking-tighter">{{ cssVar }}</code>
  `,
  styles: [
    `
      h5 {
        font-size: larger;
        font-weight: bold;
      }

      code {
        font-size: smaller;
        letter-spacing: -0.05em;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorTitleComponent {
  @Input() color = '';
  @Input() cssVar = '';
}
