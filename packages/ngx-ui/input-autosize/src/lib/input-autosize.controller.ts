import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import {
  BooleanInput,
  Controller,
  NgxBooleanInput,
} from '@swimlane/ngx-ui/common';

@Directive({
  selector: 'textarea[ngxAutosize], input[ngxAutosize]',
  exportAs: 'ngxAutosize',
})
export class InputAutosizeControllerDirective extends Controller {
  static ngAcceptInputType_ngxAutosize: BooleanInput;

  @HostBinding('class.autosize') get autosize() {
    return this.ngxAutosize;
  }

  @NgxBooleanInput()
  @Input()
  ngxAutosize = false;

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
    if (this.ngxAutosize) {
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
