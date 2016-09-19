import { ElementRef, Component } from '@angular/core';

@Component({
  selector: 'swui-dropdown-menu',
  template: `
    <ng-content></ng-content>
  `
})
export class DropdownMenu {

  element: any;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
    this.element.classList.add('swui-dropdown-menu');
  }

}
