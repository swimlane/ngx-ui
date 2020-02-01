import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ObjectNode } from '../../../../node-types/object-node.component';

@Component({
  selector: 'ngx-json-object-node',
  templateUrl: 'object-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectNodeComponent extends ObjectNode {}
