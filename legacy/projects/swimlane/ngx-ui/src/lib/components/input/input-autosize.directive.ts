import { ElementRef, Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  // tslint:disable-next-line:directive-selector
  exportAs: 'ngxAutosize',
  selector: 'textarea[autosize], input[autosize]',
  host: {
    class: 'ngx-autosize',
    '(input)': 'onInput()'
  }
})
export class AutosizeDirective {
  @Input('autosize')
  get enabled() {
    return this._enabled;
  }
  set enabled(v: boolean) {
    this._enabled = coerceBooleanProperty(v);
  }
  private _enabled = false;

  get nodeName() {
    return this.element.nativeElement.nodeName as 'TEXTAREA' | 'INPUT';
  }

  constructor(readonly element: ElementRef<HTMLInputElement | HTMLTextAreaElement>) {}

  onInput() {
    if (this._enabled) {
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
