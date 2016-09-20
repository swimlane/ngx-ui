import { ElementRef, Directive } from '@angular/core';

@Directive({
  selector: 'swui-dropdown-menu',
  host: {
    class: 'swui-dropdown-menu'
  }
})
export class DropdownMenuDirective {

  element: any;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

}
