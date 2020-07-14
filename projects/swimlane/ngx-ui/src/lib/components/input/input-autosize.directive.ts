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

  constructor(readonly element: ElementRef<HTMLElement>) {}

  onInput() {
    if (this._enabled) {
      const height = this.element.nativeElement.scrollHeight + 'px';
      const width = this.element.nativeElement.scrollWidth + 'px';

      if (this.nodeName === 'TEXTAREA') {
        this.element.nativeElement.style.height = height;
      } else {
        this.element.nativeElement.style.width = width;
      }
    }
  }
}
