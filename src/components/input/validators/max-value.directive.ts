import { Directive, Input, forwardRef, AfterViewInit, ElementRef } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

const MAX_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxValidatorDirective),
  multi: true
};

@Directive({
  selector: 'input[min]',
  providers: [MAX_VALIDATOR]
})
export class MaxValidatorDirective implements Validator, AfterViewInit {
  @Input() max: number;
  type: string;

  constructor(private elm: ElementRef) {}

  ngAfterViewInit() {
    this.type = this.elm.nativeElement.getAttribute('type');
  }

  validate(c: AbstractControl): ValidationErrors | null {
    if (this.type !== 'number') {
       return null;
    }
    return Validators.max(this.max)(c);
  }
}
