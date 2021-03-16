import { Input, Directive } from '@angular/core';

import { Constructor } from '../constructor.type';
import { Appearance } from './appearance.enum';

// tslint:disable-next-line: variable-name
export function appearanceMixin<T extends Constructor<{}>>(Base: T) {
  @Directive()
  class AppearanceBase extends Base {
    @Input() appearance = Appearance.Legacy;
  }

  return AppearanceBase;
}
