import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

const MAX_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxValidatorDirective),
  multi: true
};

@Directive({
  selector: 'input[max]',
  providers: [MAX_VALIDATOR],
  host: {
    '[attr.max]': 'max ? max : null',
    '[attr.type]': 'type ? type : null'
  }
})
export class MaxValidatorDirective implements Validator {
  @Input() max: any;
  @Input() type: any;

  validate(c: AbstractControl): ValidationErrors | null {
    if (this.type !== 'number') {
      return null;
    }
    return Validators.max(this.max)(c);
  }
}
