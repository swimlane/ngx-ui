import { Directive } from '@angular/core';

@Directive({
  exportAs: 'drawerContainer',
  selector: '[drawerContainer]',
  host: {
    '[style.position]': '"relative"',
    '[style.overflow]': '"hidden"'
  },
  standalone: false
})
export class DrawerContainerDirective {}
