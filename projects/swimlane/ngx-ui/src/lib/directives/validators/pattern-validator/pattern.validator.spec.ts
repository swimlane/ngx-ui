import { FormControl } from '@angular/forms';

import { patternValidator } from './pattern.validator';

describe('patternValidator', () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl('test');
  });

  it('should be null when valid', () => {
    expect(patternValidator('test')(control)).toBeNull();
  });

  it('should be error object when invalid', () => {
    expect(patternValidator('^[0-9]*$')(control)).toBeDefined();
  });
});
