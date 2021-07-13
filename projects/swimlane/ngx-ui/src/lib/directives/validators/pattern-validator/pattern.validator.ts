import { ValidatorFn, AbstractControl } from '@angular/forms';

export const patternValidator = (pattern: string): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } => {
    // eslint-disable-next-line
    const valid = new RegExp(pattern).test(control.value);
    return valid ? null : { patternNotMatching: { value: control.value } };
  };
};
