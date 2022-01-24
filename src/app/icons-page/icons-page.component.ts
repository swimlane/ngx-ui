/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Component } from '@angular/core';
import iconsData from '@swimlane/ngx-ui/assets/icons/json/icons.json';

@Component({
  selector: 'app-icons-page',
  templateUrl: './icons-page.component.html'
})
export class IconsPageComponent {
  // @ts-ignore
  icons = iconsData.icons.reverse();
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
