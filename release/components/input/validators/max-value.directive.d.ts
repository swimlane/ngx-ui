import { Validator, AbstractControl, ValidationErrors } from '@angular/forms';
export declare class MaxValidatorDirective implements Validator {
    max: any;
    type: any;
    validate(c: AbstractControl): ValidationErrors | null;
}
