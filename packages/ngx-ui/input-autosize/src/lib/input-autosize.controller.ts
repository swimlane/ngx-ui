import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import {
  BooleanInput,
  Controller,
  NgxBooleanInput,
} from '@swimlane/ngx-ui/common';

@Directive({
  selector: 'textarea[ngxInputAutosize], input[ngxInputAutosize]',
  exportAs: 'ngxInputAutosize',
})
export class InputAutosizeControllerDirective extends Controller {
  static ngAcceptInputType_ngxInputAutosize: BooleanInput;

  @NgxBooleanInput()
  @Input()
  ngxInputAutosize = false;

  get nodeName() {
    return this.elementRef.nativeElement.nodeName as 'TEXTAREA' | 'INPUT';
  }

  constructor(
    private readonly elementRef: ElementRef<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    super();
  }

  @HostListener('input')
  onInput() {
    if (this.ngxInputAutosize) {
      const nativeEl = this.elementRef.nativeElement;

      if (this.nodeName === 'TEXTAREA') {
        nativeEl.style.height = 'auto';

        if (nativeEl.clientHeight < nativeEl.scrollHeight) {
          nativeEl.style.height = `${nativeEl.scrollHeight}px`;
        }
      } else {
        nativeEl.style.width = 'auto';

        if (nativeEl.clientWidth < nativeEl.scrollWidth) {
          nativeEl.style.width = `${nativeEl.scrollWidth}px`;
        }
      }
    }
  }
}
