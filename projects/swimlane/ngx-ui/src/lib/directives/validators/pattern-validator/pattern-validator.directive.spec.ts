import { FormControl } from '@angular/forms';

import { PatternValidatorDirective } from './pattern-validator.directive';

describe('PatternValidatorDirective', () => {
  let directive: PatternValidatorDirective;
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl('test');
    directive = new PatternValidatorDirective();
  });

  it('should call validator', () => {
    directive.pattern = 'test';
    expect(directive.validate(control)).toBeDefined();
  });

  it('should return null', () => {
    expect(directive.validate(control)).toBeNull();
  });
});
