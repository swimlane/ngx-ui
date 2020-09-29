import { Component } from '@angular/core';
import { iconNameMap } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-icons-page',
  templateUrl: './icons-page.component.html'
})
export class IconsPageComponent {
  icons = iconNameMap.reverse();
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
