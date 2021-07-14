import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ngxDrawerContainer]',
  exportAs: 'ngxDrawerContainer',
})
export class DrawerContainerDirective {
  @HostBinding('style.position') hostPosition = 'relative';
  @HostBinding('style.overflow') hostOverflow = 'hidden';
}
