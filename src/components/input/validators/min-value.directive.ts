import { Directive, Input, forwardRef, AfterViewInit, ElementRef } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

const MIN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidatorDirective),
  multi: true
};

@Directive({
  selector: 'input[min]',
  providers: [MIN_VALIDATOR]
})
export class MinValidatorDirective implements Validator, AfterViewInit {
  @Input() min: number;
  type: string;

  constructor(private elm: ElementRef) {}

  ngAfterViewInit() {
    this.type = this.elm.nativeElement.getAttribute('type');
  }

  validate(c: AbstractControl): ValidationErrors | null {
    if (this.type !== 'number') {
       return null;
    }
    return Validators.min(this.min)(c);
  }
}
