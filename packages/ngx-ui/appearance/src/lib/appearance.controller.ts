import { Directive, HostBinding, Input } from '@angular/core';
import { Controller } from '@swimlane/ngx-ui/common';
import { Appearance, EnumKey } from '@swimlane/ngx-ui/typings';

@Directive({
  selector: '[ngxAppearance]',
  exportAs: 'ngxAppearance',
})
export class AppearanceControllerDirective extends Controller {
  @HostBinding('class.legacy') get legacy() {
    return this.appearance === Appearance.legacy;
  }

  @HostBinding('class.fill') get fill() {
    return this.appearance === Appearance.fill;
  }

  @Input() set ngxAppearance(v: EnumKey<typeof Appearance>) {
    this.appearance = Appearance[v];
  }

  appearance = Appearance.legacy;
}
