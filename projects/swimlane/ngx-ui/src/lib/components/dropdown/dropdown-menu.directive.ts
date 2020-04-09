import { ElementRef, Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  exportAs: 'ngxDropdownMenu',
  selector: 'ngx-dropdown-menu',
  host: { class: 'ngx-dropdown-menu' },
})
export class DropdownMenuDirective {
  readonly element: HTMLElement;

  constructor(private readonly el: ElementRef<HTMLElement>) {
    this.element = this.el.nativeElement;
  }
}
