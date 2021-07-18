import layoutMd from '!!raw-loader!./docs/layout.md';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  readonly layoutMd = layoutMd;
}
