import { Input, Directive } from '@angular/core';

import { Constructor } from '../constructor.type';
import { Size } from './size.enum';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions, @typescript-eslint/naming-convention
export function sizeMixin<T extends Constructor<any>>(Base: T): any {
  @Directive()
  // eslint-disable-next-line @angular-eslint/directive-class-suffix
  class SizeBase extends Base {
    @Input() size = Size.Small;
  }

  return SizeBase;
}
