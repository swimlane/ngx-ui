import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
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
}
