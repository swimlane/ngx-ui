import { Directive, ElementRef, EventEmitter, inject } from '@angular/core';
import { InViewportAction, InViewportDirective, InViewportOptions } from 'ng-in-viewport';

@Directive({
  exportAs: 'ngxDropdownMenu',
  selector: 'ngx-dropdown-menu',
  host: { class: 'ngx-dropdown-menu' },
  hostDirectives: [InViewportDirective],
  standalone: false
})
export class DropdownMenuDirective {
  readonly element: HTMLElement;

  private readonly elementRef = inject(ElementRef);
  private readonly inViewport = inject(InViewportDirective);

  constructor() {
    this.element = this.elementRef.nativeElement;
  }

  set options(value: InViewportOptions) {
    this.inViewport.options = value;
  }

  getCallbackFn(): EventEmitter<InViewportAction> {
    return this.inViewport.inViewportAction;
  }
}
