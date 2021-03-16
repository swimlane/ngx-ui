import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: 'ngx-dropdown-menu',
  exportAs: 'ngxDropdownMenu',
})
export class DropdownMenuDirective {
  @HostBinding('class.ngx-dropdown-menu') hostClass = true;

  readonly element: HTMLElement;

  constructor(private readonly el: ElementRef<HTMLElement>) {
    this.element = el.nativeElement;
  }
}
