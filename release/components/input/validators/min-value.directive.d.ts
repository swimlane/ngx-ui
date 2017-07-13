import { Validator, AbstractControl, ValidationErrors } from '@angular/forms';
export declare class MinValidatorDirective implements Validator {
    min: any;
    type: any;
    validate(c: AbstractControl): ValidationErrors | null;
}
