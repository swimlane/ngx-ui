import type { BooleanInput } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input } from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';

@Directive({
  exportAs: 'ngxAutosize',
  selector: 'textarea[autosize], input[autosize]'
})
export class InputAutosizeDirective {
  static ngAcceptInputType_autosize: BooleanInput;

  @InputBoolean()
  @Input()
  autosize = false;

  get nodeName() {
    return this.element.nativeElement.nodeName as 'TEXTAREA' | 'INPUT';
  }

  constructor(readonly element: ElementRef<HTMLInputElement | HTMLTextAreaElement>) {}

  onInput() {
    if (this.autosize) {
      const nativeEl = this.element.nativeElement;

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
