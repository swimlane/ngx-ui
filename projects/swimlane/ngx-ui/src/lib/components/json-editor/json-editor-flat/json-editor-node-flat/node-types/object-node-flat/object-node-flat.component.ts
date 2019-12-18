import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ObjectNode } from '../../../../node-types/object-node.component';

@Component({
  selector: 'ngx-json-object-node-flat',
  templateUrl: './object-node-flat.component.html',
  styleUrls: ['./object-node-flat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ObjectNodeFlatComponent extends ObjectNode {
  @Input() level: number;

  onUpdatePropertyName(options: { id: string, name: string }): void {
    this.updatePropertyName(options.id, options.name);
  }
}
