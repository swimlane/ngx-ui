import { ElementRef, Directive, Input, AfterContentInit } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgModel } from '@angular/forms';
import { delay, filter, take } from 'rxjs/operators';

@Directive({
  exportAs: 'ngxAutosize',
  selector: 'textarea[autosize], input[autosize]',
  host: {
    class: 'ngx-autosize',
    '(input)': 'onInput()'
  }
})
export class AutosizeDirective implements AfterContentInit {
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

  constructor(
    readonly element: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    private readonly ngModel: NgModel
  ) {}

  ngAfterContentInit(): void {
    if (this.ngModel) {
      this.ngModel.valueChanges
        .pipe(
          filter(value => !!value && value?.length > 0),
          take(1),
          delay(0) // delay is added as the scrollHeight of textarea is 0 even though there is value
        )
        .subscribe(() => {
          this.onInput();
        });
    }
  }

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
