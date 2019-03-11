import { ElementRef, Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'ngx-dropdown-menu',
  host: {
    class: 'ngx-dropdown-menu'
  }
})
export class DropdownMenuDirective {
  element: any;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }
}
