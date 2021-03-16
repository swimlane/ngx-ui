import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'demo-color-title',
  template: `
    <h5 class="text-lg font-bold">{{ color }}</h5>
    <code class="text-xs tracking-tighter">{{ cssVar }}</code>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorTitleComponent {
  @Input() color: string;
  @Input() cssVar: string;
}
