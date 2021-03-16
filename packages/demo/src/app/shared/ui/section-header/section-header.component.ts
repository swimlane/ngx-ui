import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';

@Component({
  selector: 'demo-section-header',
  template: `
    <h3 class="style-header">
      <ng-content></ng-content>
    </h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
  static ngAcceptInputType_section: BooleanInput;

  @HostBinding('class.section-block')
  @InputBoolean()
  @Input()
  section = false;
}
