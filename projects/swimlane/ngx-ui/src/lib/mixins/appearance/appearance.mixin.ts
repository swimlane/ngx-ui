import { Input, Directive } from '@angular/core';

import { Constructor } from '../constructor.type';
import { Appearance } from './appearance.enum';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions, @typescript-eslint/naming-convention
export function appearanceMixin<T extends Constructor<any>>(Base: T): any {
  @Directive()
  // eslint-disable-next-line @angular-eslint/directive-class-suffix
  class AppearanceBase extends Base {
    @Input() appearance = Appearance.Legacy;
  }

  return AppearanceBase;
}
