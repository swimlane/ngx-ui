import { Validator, AbstractControl, ValidationErrors } from '@angular/forms';
export declare class MinValidatorDirective implements Validator {
    min: number;
    type: string;
    validate(c: AbstractControl): ValidationErrors | null;
}
