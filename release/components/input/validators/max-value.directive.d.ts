import { Validator, AbstractControl, ValidationErrors } from '@angular/forms';
export declare class MaxValidatorDirective implements Validator {
    max: number;
    type: string;
    validate(c: AbstractControl): ValidationErrors | null;
}
