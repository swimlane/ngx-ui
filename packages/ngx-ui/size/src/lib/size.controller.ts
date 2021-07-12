import { Directive, HostBinding, Input } from '@angular/core';
import { Controller } from '@swimlane/ngx-ui/common';
import { EnumKey, Size } from '@swimlane/ngx-ui/typings';

@Directive({
  selector: '[ngxSize]',
  exportAs: 'ngxSize',
})
export class SizeControllerDirective extends Controller {
  @HostBinding('class.sm') get sm() {
    return this.size === Size.small;
  }

  @HostBinding('class.md') get md() {
    return this.size === Size.medium;
  }

  @HostBinding('class.lg') get lg() {
    return this.size === Size.large;
  }

  @Input() set ngxSize(v: EnumKey<typeof Size> | '') {
    if (v) {
      this.size = Size[v];
    }
  }

  size = Size.small;
}
