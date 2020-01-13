import { ValidatorFn, AbstractControl } from '@angular/forms';

export function patternValidator(pattern: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const valid = new RegExp(pattern).test(control.value);
    return valid ? null : { patternNotMatching: { value: control.value } };
  };
}
