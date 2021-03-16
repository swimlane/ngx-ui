import { Directive, HostBinding } from '@angular/core';

@Directive({
  exportAs: 'ngxDrawerContainer',
  selector: '[ngxDrawerContainer]'
})
export class DrawerContainerDirective {
  @HostBinding('style.position') hostPosition = 'relative';
  @HostBinding('style.overflow') hostOverflow = 'hidden';
}
