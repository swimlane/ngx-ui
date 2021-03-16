import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  layoutMd = `
  \`ngx-ui\`'s layout system is a set of CSS classes implementing **flex-box** with
  reasonable defaults. This system uses three main classes: \`.ngx-flex--wrap\`,
  \`.ngx-flex--col\`, and \`.ngx-flex--row\` as well as **modifiers** as demonstrated below.
  Of these three classes only \`.ngx-flex--row\` is needed for simple **flex-box**
  layouts. Containers are optional wrappers that contain \`ngx-flex--rows\`. Use the
  toggle below to see each container layout.

  - \`.ngx-flex--wrap\`, \`.ngx-flex--wrap-fluid\` is \`width: 100%\` at all breakpoints
  - \`.ngx-flex--wrap-fixed\` sets a \`max-width\` at each responsive breakpoint
  `;
}
