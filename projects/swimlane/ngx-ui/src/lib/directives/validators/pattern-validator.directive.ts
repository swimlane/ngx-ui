import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

export function patternValidator(pattern: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const valid = new RegExp(pattern).test(control.value);
    return valid ? null : { patternNotMatching: { value: control.value } };
  };
}

@Directive({
  selector: '[pattern]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PatternValidatorDirective, multi: true }]
})
export class PatternValidatorDirective implements Validator {
  @Input('pattern')
  pattern: string;

  validate(control: AbstractControl): { [key: string]: any } {
    return this.pattern ? patternValidator(this.pattern)(control) : null;
  }
}
