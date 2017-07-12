import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

const MIN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidatorDirective),
  multi: true
};

@Directive({
  selector: 'input[min]',
  providers: [MIN_VALIDATOR],
  host: {
    '[attr.min]': 'min ? min : null',
    '[attr.type]': 'type ? type : null'
  }
})
export class MinValidatorDirective implements Validator {
  @Input() min: any;
  @Input() type: any;

  validate(c: AbstractControl): ValidationErrors | null {
    if (this.type !== 'number') {
      return null;
    }
    return Validators.min(this.min)(c);
  }
}
