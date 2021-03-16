import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconsComponent {
  icons = require('../../../../../ngx-ui/assets/icons/json/icons.json').icons.reverse();
  iconFx = [
    'inverse',
    'rotate-90',
    'rotate-180',
    'rotate-270',
    'flip',
    'flip-y',
    'half-sized',
    'dbl-sized',
    'badge',
    'spinning',
    'spinning-rev'
  ];

  iconsStackingMd = `
    \`\`\`html
    <span class="icon-fx-stacked">
      <i class="ngx-icon ngx-square"></i>
      <i class="ngx-icon ngx-x text-red"></i>
    </span>
    <span class="icon-fx-stacked">
      <i class="ngx-icon ngx-square-filled"></i>
      <i class="ngx-icon ngx-x text-red"></i>
    </span>
    <span class="icon-fx-stacked">
      <i class="ngx-icon ngx-square-filled"></i>
      <i class="ngx-icon ngx-x text-red icon-fx-spinning"></i>
    </span>
    <span class="icon-fx-stacked">
      <i class="ngx-icon ngx-field-users"></i>
      <i class="ngx-icon ngx-circle-filled text-red icon-fx-badge"></i>
    </span>
    \`\`\`
  `;
}
