import type { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { ArrayNode } from '../../../directives';

@Component({
  selector: 'ngx-json-array-node',
  templateUrl: './array-node.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayNodeComponent extends ArrayNode {
  static ngAcceptInputType_isDuplicated: BooleanInput;

  @InputBoolean()
  @Input()
  isDuplicated = false;
}
