import { Component } from '@angular/core';
import { icons } from '@swimlane/ngx-ui/lib/assets/icons/json/icons.json';

@Component({
  selector: 'app-icons-page',
  templateUrl: './icons-page.component.html'
})
export class IconsPageComponent {

  icons = icons.reverse();
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
