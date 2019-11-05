import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ArrayNode } from '../../../node-types/array-node.component';

@Component({
  selector: 'ngx-json-array-node-v2',
  templateUrl: './array-node-v2.component.html',
  styleUrls: ['./array-node-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArrayNodeV2Component extends ArrayNode {
  @Input() level: number;
}
