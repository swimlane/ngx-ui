import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ObjectNode } from '../../../../node-types/object-node.component';

@Component({
  selector: 'ngx-json-object-node-v2',
  templateUrl: './object-node-v2.component.html',
  styleUrls: ['./object-node-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ObjectNodeV2Component extends ObjectNode {
  @Input() level: number;
}
