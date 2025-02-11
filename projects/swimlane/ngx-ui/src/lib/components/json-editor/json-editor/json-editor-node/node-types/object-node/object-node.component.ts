import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { ObjectNode } from '../../../../node-types/object-node.component';

@Component({
  selector: 'ngx-json-object-node',
  templateUrl: 'object-node.component.html',
  styleUrls: ['object-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ObjectNodeComponent extends ObjectNode {
  @Input() isDuplicated = false;

  @Input() passwordToggleEnabled = false;

  constructor(protected cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
