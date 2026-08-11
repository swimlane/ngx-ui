import { Directive, ElementRef, EventEmitter, Inject, NgZone, PLATFORM_ID } from '@angular/core';

import { InViewportDirective } from '../../directives/in-viewport/in-viewport.directive';
import { InViewportActionEvent } from '../../directives/in-viewport/in-viewport.types';

@Directive({
  exportAs: 'ngxDropdownMenu',
  selector: 'ngx-dropdown-menu',
  host: { class: 'ngx-dropdown-menu' },
  standalone: false
})
export class DropdownMenuDirective extends InViewportDirective {
  readonly element: HTMLElement;

  constructor(@Inject(PLATFORM_ID) platformId: object, elementRef: ElementRef<HTMLElement>, ngZone: NgZone) {
    super(platformId, elementRef, ngZone);
    this.element = elementRef.nativeElement;
  }

  getCallbackFn(): EventEmitter<InViewportActionEvent> {
    return this.inViewportAction;
  }
}
