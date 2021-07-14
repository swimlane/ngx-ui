import {
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { InViewportDirective, InViewportService } from 'ng-in-viewport';

@Directive({
  selector: 'ngx-dropdown-menu',
  exportAs: 'ngxDropdownMenu',
})
export class DropdownMenuDirective extends InViewportDirective {
  @HostBinding('class.ngx-dropdown-menu') hostClass = true;

  readonly element: HTMLElement;

  constructor(
    @Inject(PLATFORM_ID) readonly platformIdentifier: Record<string, unknown>,
    readonly elementReference: ElementRef,
    readonly insideViewport: InViewportService
  ) {
    super(platformIdentifier, elementReference, insideViewport);
    this.element = this.elementReference.nativeElement;
  }

  getCallbackFn() {
    return this.inViewportAction;
  }
}
