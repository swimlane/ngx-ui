import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
} from '@angular/core';
import {
  BooleanInput,
  Controller,
  NgxBooleanInput,
} from '@swimlane/ngx-ui/common';
import { queueForNextRender } from '@swimlane/ngx-ui/utils';

@Directive({
  selector: '[ngxAutofocus]',
  exportAs: 'ngxAutofocus',
})
export class AutofocusControllerDirective
  extends Controller
  implements AfterViewInit
{
  static ngAcceptInputType_ngxAutofocus: BooleanInput;

  @NgxBooleanInput()
  @Input()
  ngxAutofocus = false;

  @Input() ngxAutofocusOptions?: FocusOptions;

  focusableElement: HTMLElement;

  constructor(
    private readonly elRef: ElementRef<HTMLElement>,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
    this.focusableElement = elRef.nativeElement;
  }

  ngAfterViewInit() {
    if (this.ngxAutofocus) {
      queueForNextRender(() => {
        this.focusableElement.focus(this.ngxAutofocusOptions);
        this.cdr.markForCheck();
      });
    }
  }
}
