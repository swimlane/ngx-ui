import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

const MIN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidatorDirective),
  multi: true
};

@Directive({
  selector: 'input[min][type]',
  providers: [MIN_VALIDATOR]
})
export class MinValidatorDirective implements Validator {
  @Input() min: number;
  @Input() type: string;

  validate(c: AbstractControl): ValidationErrors | null {
    if (this.type !== 'number') {
       return null;
    }
    return Validators.min(this.min)(c);
  }
}
