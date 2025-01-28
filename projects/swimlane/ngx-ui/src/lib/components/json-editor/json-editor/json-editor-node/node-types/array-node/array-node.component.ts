import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ArrayNode } from '../../../../node-types/array-node.component';

@Component({
  selector: 'ngx-json-array-node',
  templateUrl: 'array-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ArrayNodeComponent extends ArrayNode {
  @Input() isDuplicated = false;

  @Input() passwordToggleEnabled = false;
}
