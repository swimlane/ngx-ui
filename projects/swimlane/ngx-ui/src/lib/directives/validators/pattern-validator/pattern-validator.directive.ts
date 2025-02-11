import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

import { patternValidator } from './pattern.validator';

@Directive({
  selector: '[pattern]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PatternValidatorDirective,
      multi: true
    }
  ],
  standalone: false
})
export class PatternValidatorDirective implements Validator {
  @Input() pattern: string;

  validate(control: AbstractControl): { [key: string]: any } {
    return this.pattern ? patternValidator(this.pattern)(control) : null;
  }
}
