import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-prism',
  template: `
    <pre>
      <code class="language-{{ language }}">
        <ng-content></ng-content>
      </code>
    </pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-prism'
  }
})
export class PrismComponent {
  @Input() language = 'html';
}
