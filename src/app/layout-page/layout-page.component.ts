import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  standalone: false
})
export class LayoutPageComponent {
  containerClass = 'ngx-flex--wrap';
  toggleChk = false;
}
