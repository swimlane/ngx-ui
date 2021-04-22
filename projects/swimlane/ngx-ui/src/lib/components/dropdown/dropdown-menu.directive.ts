import { ElementRef, Directive, Inject, PLATFORM_ID, EventEmitter } from '@angular/core';
import { InViewportDirective, InViewportService } from 'ng-in-viewport';

@Directive({
  // tslint:disable-next-line:directive-selector
  exportAs: 'ngxDropdownMenu',
  selector: 'ngx-dropdown-menu',
  host: { class: 'ngx-dropdown-menu' }
})
export class DropdownMenuDirective extends InViewportDirective {
  readonly element: HTMLElement;

  constructor(
    @Inject(PLATFORM_ID) readonly _platformIdentifier: any,
    readonly _elementReference: ElementRef,
    readonly _insideViewport: InViewportService
  ) {
    super(_platformIdentifier, _elementReference, _insideViewport);
    this.element = this._elementReference.nativeElement;
  }

  getCallbackFn(): EventEmitter<any> {
    return this.inViewportAction;
  }
}
