import type { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { ObjectNode } from '../../../directives';

@Component({
  selector: 'ngx-json-object-node',
  templateUrl: './object-node.component.html',
  styles: [
    `
      .invalid {
        border: 1px solid #e02f00;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectNodeComponent extends ObjectNode {
  static ngAcceptInputType_isDuplicated: BooleanInput;

  @InputBoolean()
  @Input()
  isDuplicated = false;
}
