import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ArrayNode } from '../../../../node-types/array-node.component';

@Component({
  selector: 'ngx-json-array-node-flat',
  templateUrl: './array-node-flat.component.html',
  styleUrls: ['./array-node-flat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArrayNodeFlatComponent extends ArrayNode {
  @Input() level: number;
  @Input() schemaBuilderMode: boolean;
}
