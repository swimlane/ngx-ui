import { Input } from '@angular/core';

import { Constructor } from '../constructor.type';
import { Size } from './size.enum';

// tslint:disable-next-line: variable-name
export function sizeMixin<T extends Constructor<{}>>(Base: T) {
  class SizeBase extends Base {
    @Input() size = Size.Small;
  }

  return SizeBase;
}
