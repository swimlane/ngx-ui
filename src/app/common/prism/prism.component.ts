import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import Prism from 'prismjs';

@Component({
  selector: 'app-prism',
  template: `
    <pre>
      <code class="language-{{ language }}"><ng-content></ng-content></code>
    </pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-prism'
  }
})
export class PrismComponent implements AfterViewInit {
  @Input() language = 'html';

  constructor(private readonly _el: ElementRef) {}

  ngAfterViewInit() {
    Prism.highlightAllUnder(this._el.nativeElement);
  }
}
