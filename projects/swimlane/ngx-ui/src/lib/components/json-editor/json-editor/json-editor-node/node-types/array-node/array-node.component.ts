import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ArrayNode } from '../../../../node-types/array-node.component';

@Component({
  selector: 'ngx-json-array-node',
  templateUrl: 'array-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayNodeComponent extends ArrayNode {}
