import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { ArrayNode } from '../../../directives';

@Component({
  selector: 'ngx-json-array-node',
  templateUrl: './array-node.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrayNodeComponent extends ArrayNode {
  static ngAcceptInputType_isDuplicated: BooleanInput;

  @NgxBooleanInput()
  @Input()
  isDuplicated = false;
}
