import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class MaxValidatorDirective implements Validator {
  @Input() max: number;
  @Input() type: string;

  validate(c: AbstractControl): ValidationErrors | null {
    if (this.type !== 'number') {
       return null;
    }
    return Validators.max(this.max)(c);
  }
}
